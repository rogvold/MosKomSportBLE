import { combineReducers } from 'redux';

import BluetoothReducer from './BluetoothReducer.js';
import NavigationReducer from './NavigationReducer.js';
import SensorsReducer from './SensorsReducer.js';
import CardioTestsReducer from './CardioTestsReducer.js';
import LangReducer from './LangReducer.js';

import { reducer as formReducer } from 'redux-form'

export const reducer = combineReducers({
    bluetooth: BluetoothReducer,
    navigation: NavigationReducer,
    sensors: SensorsReducer,
    cardioTest: CardioTestsReducer,
    lang: LangReducer,
    form: formReducer
});
