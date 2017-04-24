
import * as types from '../constants/ActionTypes'

//ble manager initialization
export function startBLEManager_(){
    return {
        type: types.BLE_MANAGER_START
    }
}
export function  startBLEManagerSuccess(){
    return {
        type: types.BLE_MANAGER_START_SUCCESS
    }
}
export function startBLEManagerFail(error) {
    return {
        type: types.BLE_MANAGER_START_FAIL,
        error: error
    }
}

//discovering
export function onDiscovered(data){
    return {
      type: types.BLE_MANAGER_DISCOVERED_SMTH,
      data: data
    }
}

//scanning
export function startScanning(){
    return {
      type: types.BLE_MANAGER_SCAN_STARTED
    }
}
export function stopScanning(){
    return {
      type: types.BLE_MANAGER_SCAN_STOPPED
    }
}

//connection
export function connectToSensor(sensorId){
    return {
      type: types.BLE_MANAGER_CONNECT_TO_SENSOR,
      sensorId: sensorId
    }
}
export function connectToSensorSuccess(sensorId, data){
    if (__DEV__){
        console.log('actions: connectToSensorSuccess: sensorId, data = ', sensorId, data);
    }
    return {
      type: types.BLE_MANAGER_CONNECT_TO_SENSOR_SUCCESS,
      sensorId: sensorId,
      data: data
    }
}
export function connectToSensorFail(sensorId){
    return {
      type: types.BLE_MANAGER_CONNECT_TO_SENSOR_FAIL,
      sensorId: sensorId
    }
}
export function disconnectFromSensor(sensorId){
    return {
        type: types.BLE_MANAGER_DISCONNECT_FROM_SENSOR,
        sensorId: sensorId
    }
}
export function disconnectFromSensorSuccess(sensorId){
    return {
        type: types.BLE_MANAGER_DISCONNECT_FROM_SENSOR_SUCCESS,
        sensorId: sensorId
    }
}
export function disconnectFromSensorFail(sensorId){
    return {
        type: types.BLE_MANAGER_DISCONNECT_FROM_SENSOR_FAIL,
        sensorId: sensorId
    }
}

//check
export function checkSensorConnection(sensorId){
    return {
        type: types.CHECK_IF_SENSOR_CONNECTED,
        sensorId: sensorId
    }
}
export function checkSensorConnectionSuccess(sensorId){
    return {
        type: types.CHECK_IF_SENSOR_CONNECTED_SUCCESS,
        sensorId: sensorId
    }
}
export function checkSensorConnectionFail(sensorId){
    return {
        type: types.CHECK_IF_SENSOR_CONNECTED_FAIL,
        sensorId: sensorId
    }
}

//data received
export function onSensorDataReceived(sensorId, data){
    return {
      type: types.ON_SENSOR_DATA_RECEIVED,
      sensorId: sensorId,
      data: data
    }
}
