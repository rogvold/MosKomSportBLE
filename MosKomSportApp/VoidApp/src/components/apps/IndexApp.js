/**
 * Created by sabir on 01.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import BluetoothComponent from '../bluetooth/BluetoothComponent'
import SensorsListPanel from '../bluetooth/panels/SensorsListPanel'
import ScanButton from '../bluetooth/buttons/ScanButton'


class IndexApp extends React.Component {

    static defaultProps = {}

    static propTypes = {

    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }


    render() {
      return (
          <View style={{padding: 22, flexDirection: 'column', flex: 1}} >

              <ScrollView style={{flex: 1,  paddingBottom: 200}} >
                  <SensorsListPanel />
              </ScrollView>

              <View style={styles.bottomPlaceholder}>

                  <View style={styles.bottomPanel} >
                      <View style={{alignSelf: 'flex-end'}} >
                          <ScanButton />
                      </View>
                  </View>

              </View>


          </View>
      );
    }

}

var styles = StyleSheet.create({

    container: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
        alignSelf: 'center'
    },

    bottomPlaceholder: {
        zIndex: 2,
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        left: 0,
        right: 0,
        bottom: 40
    },

    bottomPanel: {
        backgroundColor: 'white',
        paddingBottom: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        height: 50
    },

    scanText: {
        color: 'white',
        fontSize: 20
    }

});

export default IndexApp
