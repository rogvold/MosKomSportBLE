/**
 * Created by sabir on 16.01.17.
 */
import * as types from '../constants/ActionTypes.js'

import StorageHelper from '../helpers/StorageHelper'

//SET LANG
let setLang_ = () => {
    return {
        type: types.SET_LANG
    }
}

let setLangFail = (error) => {
    if (__DEV__){
        console.log('setLangFail: error = ', error);
    }
    return {
        type: types.SET_LANG_FAIL,
        error: error
    }
}

let setLangSuccess = (lang) => {
    return {
        type: types.SET_LANG_SUCCESS,
        lang: lang
    }
}
//thunk
export function setLang(lang){
    if (lang == undefined){
        lang = 'en';
    }
    return (dispatch, getState) => {
        dispatch(setLang_())
        return StorageHelper.saveLanguage(lang).then(
            d => dispatch(setLangSuccess(d.lang)),
            error => dispatch(setLangFail(error))
        )
    }
}

//LOAD LANG
let loadLang_ = () => {
    return {
        type: types.LOAD_LANG
    }
}
let loadLangFail = (error) => {
    return {
        type: types.LOAD_LANG_FAIL,
        error: error
    }
}
let loadLangSuccess = (lang) => {
    return {
        type: types.LOAD_LANG_SUCCESS,
        lang: lang
    }
}
//thunk
export function loadLang() {
    return (dispatch, getState) => {
        dispatch(loadLang_())
        return StorageHelper.getLang().then(
            d => dispatch(loadLangSuccess(d.lang)),
            error => dispatch(loadLangFail(error))
        )
    }
}
