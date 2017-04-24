/**
 * Created by sabir on 16.01.17.
 */

import data from '../data/LangDataFactory'

let LangHelper = {

    getString: function(name, lang, toUpper) {
        if (name == undefined){
            return undefined;
        }
        name = name.toUpperCase();
        if (lang == undefined){
            lang = 'en';
        }
        let sd = data[name];
        if (sd == undefined){
            return undefined;
        }
        let s = data[name][lang];
        if (toUpper == true && s != undefined){
            s = s.toUpperCase();
        }
        return s;
    }

}

export default LangHelper;
