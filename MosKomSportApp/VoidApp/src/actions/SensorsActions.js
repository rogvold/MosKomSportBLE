/**
 * Created by sabir on 24.12.16.
 */

import * as types from '../constants/ActionTypes.js'

import StorageHelper from '../helpers/StorageHelper'

//loading
let loadSensors_ = () => {
    return {
        type: types.LOAD_SENSORS
    }
}
let loadSensorsFail = () => {
    return {
        type: types.LOAD_SENSORS_FAIL
    }
}
let loadSensorsSuccess = (sensorsMap) => {
    return {
        type: types.LOAD_SENSORS_SUCCESS,
        sensorsMap: sensorsMap
    }
}
//thunk
export function loadSensors(){
    return (dispatch, getState) => {
        loadSensors_();
        return StorageHelper.getSavedSensors().then(
            sensorsMap => dispatch(loadSensorsSuccess(sensorsMap)),
            error => dispatch(loadSensorsFail(error))
        )
    }
}


//saving
let saveSensors_ = () => {
    if (__DEV__){
        console.log('saveSensors_ occured');
    }
    return {
        type: types.SAVE_SENSORS
    }
}
let saveSensorsFail = (err) => {
    return {
        type: types.SAVE_SENSORS_FAIL,
        error: err
    }
}
let saveSensorsSuccess = (sensorsMap) => {
    return {
        type: types.SAVE_SENSORS_SUCCESS,
        sensorsMap: sensorsMap
    }
}
//thunk
export function saveSensors(newSensorsMap){
    return (dispatch, getState) => {
        saveSensors_();
        return StorageHelper.saveSensors(newSensorsMap).then(
            ss => dispatch(saveSensorsSuccess(ss)),
            error => dispatch(saveSensorsFail(error))
        )
    }
}
export function saveSensor(data){
    if (__DEV__){
        console.log('saveSensor: data', data);
    }
    return (dispatch, getState) => {

        if (data == undefined || data.id == undefined){
            return new Promise.resolve(saveSensorsFail());
        }

        let map = getState().sensors.sensorsMap;
        let s = (map[data.id] == undefined) ? {} : map[data.id];
        let d = Object.assign({}, s, data);
        if (d.displayName == undefined){
            d.displayName = d.name;
        }
        let newMap = Object.assign({}, map, {[d.id]: d});

        saveSensors_();
        return StorageHelper.saveSensors(newMap).then(
            ss => dispatch(saveSensorsSuccess(newMap)),
            error => dispatch(saveSensorsFail(error))
        )
    }
}
export function createSensor(data){
    if (__DEV__){
        console.log('createSensor: data', data);
    }
    return (dispatch, getState) => {
        if (data == undefined || data.id == undefined){
            return new Promise.resolve(saveSensorsFail());
        }
        let map = getState().sensors.sensorsMap;
        if (map[data.id] != undefined){
            return new Promise.resolve(saveSensorsSuccess(map));
        }
        return dispatch(saveSensor(data));
    }
}