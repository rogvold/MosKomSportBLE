/**
 * Created by sabir on 27.12.16.
 */

let CardioHelper = {

    getCardioTestSensors: (state) => {
        let map = state.sensors.sensorsMap;
        let selectedSensorsMap = state.cardioTest.selectedSensorsMap;
        let {connectedSensorsMap} = state.bluetooth;
        let arr = [];
        for (var key in map){
            let s = map[key];
            if (s.shouldShow == true && connectedSensorsMap[s.id] != undefined && selectedSensorsMap[s.id] != undefined){
                arr.push(s);
            }
        }
        arr.sort((a, b) => {
            if (a.id < b.id) return 1;
            if (a.id > b.id) return 1;
            return 0;
        })
        return arr;
    },

    getSensorData: (state, sensorId) => {
        let dataMap = state.bluetooth.dataMap;
        var arr = dataMap[sensorId];
        if (arr == undefined){
            arr = [];
        }
        return arr;
    },

    getLastSensorData: (state, sensorId) => {
        let arr = CardioHelper.getSensorData(state, sensorId);
        if (arr.length == 0){
            return undefined;
        }
        return arr[arr.length - 1];
    },

    getCurrentHeartRate: (state, sensorId) => {
        let d = CardioHelper.getLastSensorData(state, sensorId);
        if (d == undefined){
            return null;
        }
        return d.hr;
    }

}

export default CardioHelper;
