/**
 * Created by sabir on 25.12.16.
 */

import * as types from '../constants/ActionTypes.js'

const initialState = {
    startTimestamp: undefined,
    currentTestName: undefined,
    selectedSensorsMap: {}
}

const CardioTestsReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.SELECT_TEST:
            return {
                ...state,
                currentTestName: action.name
            }

        case types.START_TEST:
            return {
                ...state,
                startTimestamp: (new Date()).getTime()
            }

        case types.STOP_TEST:
            return {
                ...state,
                startTimestamp: undefined,
                currentTestName: undefined,
                selectedSensorsMap: {}
            }


        case types.SELECT_SENSORS:
            return {
                ...state,
                selectedSensorsMap: action.selectedSensorsMap
            }

        default:
            return state;
    }

}

export default CardioTestsReducer;
