/**
 * Created by sabir on 23.12.16.
 */

import {
    AsyncStorage
} from 'react-native';

let StorageHelper = {

    saveSensors:  (sensorsMap = {}) => {
        let STORAGE_KEY = '@AsyncStorage:sensorsMap';
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sensorsMap), (e)=>{console.log(e)}).then(
                () => { resolve(sensorsMap)},
                (error) => { reject(error)}
            )
        });
    },

    getSavedSensors: () => {
        let STORAGE_KEY = '@AsyncStorage:sensorsMap';
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(STORAGE_KEY, (e)=>{console.log(e)}).then(
                (data) => {
                                if (data == undefined){
                                    resolve({})
                                }else {
                                    resolve(JSON.parse(data));
                                }
                },
                error => reject(error)
            )
        });
    },

    saveLanguage: (lang) => {
        let defaultLang = 'ru';
        if (lang == undefined){
            lang = defaultLang;
        }
        let STORAGE_KEY = '@AsyncStorage:lang';
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({lang: lang}), (e)=>{console.log(e)}).then(
                () => { resolve({lang: lang})},
                (error) => { reject(error)}
            )
        });
    },

    getLang: () => {
        let STORAGE_KEY = '@AsyncStorage:lang';
        let defaultLang = 'ru';
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(STORAGE_KEY, (e)=>{console.log(e)}).then(
                (data) => {
                    if (data == undefined){
                        resolve({lang: defaultLang})
                    }else {
                        resolve(JSON.parse(data));
                    }
                },
                error => reject(error)
            )
        });
    }

}

export default StorageHelper;
