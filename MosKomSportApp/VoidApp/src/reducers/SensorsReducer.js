/**
 * Created by sabir on 23.12.16.
 */

import * as types from '../constants/ActionTypes.js'

const initialState = {
    sensorsMap: {},
    loading: false
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

// const consumeSensors = (state, sensorsMap = {}) => {
//     let newSensorsMap = Object.assign({}, state.sensorsMap);
//     for (var i in sensors){
//         let s = sensors[i];
//         if (s == undefined){
//             continue;
//         }
//         newSensorsMap[s.id] = s;
//     }
//     return newSensorsMap;
// }

const SensorsReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.SAVE_SENSORS:
            return startLoading(state, action)
        case types.SAVE_SENSORS_FAIL:
            return stopLoading(state, action)
        case types.SAVE_SENSORS_SUCCESS:
            return {
                ...state,
                loading: false,
                sensorsMap: action.sensorsMap
            }

        case types.LOAD_SENSORS:
            return startLoading(state, action)
        case types.LOAD_SENSORS_FAIL:
            return stopLoading(state, action)
        case types.LOAD_SENSORS_SUCCESS:
            return {
                ...state,
                loading: false,
                sensorsMap: action.sensorsMap
            }

        default:
            return state;
    }

}

export default SensorsReducer;
