// 'use strict';
//
// import 'babel-polyfill'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import React from 'react';


import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux';

//app
import App from './components/apps/App.js'

//api
// import ParseAPI from './api/ParseAPI.js';

// import * as usersActions from './actions/UsersActions.js';

import {reducer} from './reducers'

const loggerMiddleware = createLogger()

import * as sensorsActions from './actions/SensorsActions'
import * as langActions from './actions/LangActions'

import KeepAwake from 'react-native-keep-awake';

// console.log('KeepAwake imported: KeepAwake = ' + JSON.stringify(KeepAwake));
KeepAwake.activate();

const store = (__DEV__ ? createStore(
            reducer,
            applyMiddleware(thunkMiddleware, loggerMiddleware)
        ) :
        createStore(
            reducer,
            applyMiddleware(thunkMiddleware)
        )
);

// ParseAPI.initParse();

export default function setup() {

  class RootApp extends React.Component{

      render() {
          if (__DEV__){
              console.log('rendering app');
          }
          return (
              <Provider store={store}>

                  <App />

              </Provider>
          );
      }

  }

  // ParseAPI.initParse();

  // store.dispatch(sensorsActions.loadSensors());
  store.dispatch(runPrepareActions());

  return RootApp;

}

let runPrepareActions = () => {
    return (dispatch, getState) => {
        dispatch(sensorsActions.loadSensors())
        dispatch(langActions.loadLang())
    }
}


// AppRegistry.registerComponent('RootApp', () => RootApp);

// store.dispatch(usersActions.initializeAuthorization());
