/**
 * Created by sabir on 16.01.17.
 */

import * as types from '../constants/ActionTypes.js'

const initialState = {
    lang: 'ru',
    error: undefined,
    loading: false
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}


const LangReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOAD_LANG:
            return startLoading(state, action)
        case types.LOAD_LANG_FAIL:
            return stopLoading(state, action)
        case types.LOAD_LANG_SUCCESS:
            return {
                ...state,
                loading: false,
                lang: action.lang
            }

        case types.SET_LANG:
            return startLoading(state, action)
        case types.SET_LANG_FAIL:
            return stopLoading(state, action)
        case types.SET_LANG_SUCCESS:
            return {
                ...state,
                loading: false,
                lang: action.lang
            }

        default:
            return state;
    }

}

export default LangReducer;
