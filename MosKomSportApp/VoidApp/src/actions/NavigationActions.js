/**
 * Created by sabir on 23.12.16.
 */
import * as types from '../constants/ActionTypes.js'

export function switchTab(tab){
    return {
        type: types.SWITCH_TAB,
        tab: tab
    }
}
