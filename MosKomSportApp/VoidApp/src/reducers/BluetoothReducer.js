import * as types from '../constants/ActionTypes.js'

import * as bConstants from '../constants/BluetoothConstants.js'

const initialState = {
    bluetoothStatus: undefined,
    discoveredSensorsMap: {},
    connectedSensorsMap: {},
    sensorsConnectionStatusMap: {},
    dataMap: {}
}

let consumeDiscoveredSensor = (oldDiscoveredSensorsMap, data) => {
    var newDiscoveredSensorsMap = Object.assign({}, oldDiscoveredSensorsMap);
    newDiscoveredSensorsMap[data.id] = data;
    return newDiscoveredSensorsMap;
}

let consumeConnectedSensor = (oldConnectedSensorsMap, data) => {
    var newConnectedSensorsMap = Object.assign({}, oldConnectedSensorsMap);
    newConnectedSensorsMap[data.id] = data;
    return newConnectedSensorsMap;
}

let removeFromConnectedSensorsMap = (oldConnectedSensorsMap, sensorId) => {
    var newConnectedSensorsMap = Object.assign({}, oldConnectedSensorsMap);
    newConnectedSensorsMap[sensorId] = undefined;
    return newConnectedSensorsMap;
}

let consumeData = (oldDataMap, sensorId, data) => {
    if (__DEV__){
        console.log('consumeData: data = ', data);
    }
    var dataMap = Object.assign({}, oldDataMap);
    if (dataMap[sensorId] == undefined){
        dataMap[sensorId] = [];
    }
    data.t = (new Date()).getTime();
    dataMap[sensorId].push(data);
    return dataMap;
}

const BluetoothReducer =  (state = initialState, action = {}) => {

  switch (action.type) {

      case types.BLE_MANAGER_START:
          // var data = action.data;
          // var channelName = data.channelName;
          // var channelsMap = Object.assign({}, state.channelsMap);
          // if (channelsMap[channelName] == undefined){
          //     channelsMap[channelName] = [];
          // }
          // data.t = +new Date();
          // channelsMap[channelName].push(data.message);
          return {...state, bluetoothStatus: bConstants.STARTING}

      case types.BLE_MANAGER_START_SUCCESS:
          return {...state, bluetoothStatus: bConstants.STARTED}

      case types.BLE_MANAGER_START_FAIL:
          return {...state, bluetoothStatus: bConstants.STARTING}


      case types.BLE_MANAGER_DISCOVERED_SMTH:
            var map = Object.assign({}, state.sensorsConnectionStatusMap);
            map[action.data.id] = bConstants.DISCOVERED;
            return {...state, discoveredSensorsMap: consumeDiscoveredSensor(state.discoveredSensorsMap, action.data), sensorsConnectionStatusMap: map}

      case types.BLE_MANAGER_SCAN_STARTED:
            return {...state, bluetoothStatus: bConstants.SCANNING}
      case types.BLE_MANAGER_SCAN_STOPPED:
            return {...state, bluetoothStatus: bConstants.STARTED}


      case types.BLE_MANAGER_CONNECT_TO_SENSOR:
            var map = Object.assign({}, state.sensorsConnectionStatusMap);
            map[action.sensorId] = bConstants.CONNECTING;
            return {...state, sensorsConnectionStatusMap: map}

      case types.BLE_MANAGER_CONNECT_TO_SENSOR_SUCCESS:
            var map = Object.assign({}, state.sensorsConnectionStatusMap);
            map[action.sensorId] = bConstants.CONNECTED;
            return {...state, sensorsConnectionStatusMap: map, connectedSensorsMap: consumeConnectedSensor(state.connectedSensorsMap, action.data)}

      case types.BLE_MANAGER_CONNECT_TO_SENSOR_FAIL:
            var map = Object.assign({}, state.sensorsConnectionStatusMap);
            map[action.sensorId] = bConstants.NOT_CONNECTED;
            return {...state, sensorsConnectionStatusMap: map, connectedSensorsMap: removeFromConnectedSensorsMap(state.connectedSensorsMap, action.sensorId)}

      case types.BLE_MANAGER_DISCONNECT_FROM_SENSOR_SUCCESS:
            var map = Object.assign({}, state.sensorsConnectionStatusMap);
            map[action.sensorId] = bConstants.NOT_CONNECTED;
            return {...state, sensorsConnectionStatusMap: map, connectedSensorsMap: removeFromConnectedSensorsMap(state.connectedSensorsMap, action.sensorId)}


      case types.ON_SENSOR_DATA_RECEIVED:
            return {...state, dataMap: consumeData(state.dataMap, action.sensorId, action.data)}


      default:
          return state;
  }

}

export default BluetoothReducer;
