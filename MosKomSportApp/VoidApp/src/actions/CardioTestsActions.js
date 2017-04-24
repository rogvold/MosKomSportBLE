/**
 * Created by sabir on 25.12.16.
 */

import * as types from '../constants/ActionTypes.js'

export function selectTest(name){
    return {
        type: types.SELECT_TEST,
        name: name
    }
}

export function startTest(){
    return {
        type: types.START_TEST
    }
}

export function stopTest(){
    return {
        type: types.STOP_TEST
    }
}

export function selectSensors(sensorsMap){
    return {
        type: types.SELECT_SENSORS,
        selectedSensorsMap: sensorsMap
    }
}