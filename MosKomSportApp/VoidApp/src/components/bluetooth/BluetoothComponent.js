

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BleManager from 'react-native-ble-manager';

import * as bActions from '../../actions/BluetoothActions';
import * as sensorsActions from '../../actions/SensorsActions';

import BLEHelper from '../../helpers/BLEHelper'

import SensorsListPanel from './panels/SensorsListPanel'
import ScanButton from './buttons/ScanButton'

import BLEConnectionMaintainer from './robots/BLEConnectionMaintainer'

import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  Platform,
  PermissionsAndroid,
  Modal
} from 'react-native';


class BluetoothComponent extends React.Component {

    static defaultProps = {
        maintainConnection: true,
        scanOnMount: false,
        scanTimeout: 10
    }

    static propTypes = {
        bluetooth: PropTypes.object,
        maintainConnection: PropTypes.bool
    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps() {

    }

    componentDidMount = () => {
        BleManager.start({showAlert: true});
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);

        NativeAppEventEmitter
            .addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );

        NativeAppEventEmitter
            .addListener('BleManagerDidUpdateValueForCharacteristic', this.handleCharacteristicChange);

        NativeAppEventEmitter
            .addListener('BleManagerDisconnectPeripheral', (d) => {this.props.disconnectFromSensorSuccess(d.peripheral)});

        NativeAppEventEmitter
            .addListener('BleManagerStopScan',() => {
                            this.props.stopScanning();
                        });

        NativeAppEventEmitter
            .addListener('BleManagerDidUpdateState',(args) => {
                            this.onBLEManagerUpdateState(args.state);
                            // console.log('---->>>>   BleManagerDidUpdateState: args = ', args);
                        });
                        //

        // BleManagerDidUpdateValueForCharacteristic

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  if (__DEV__){
                      console.log("Permission is OK");
                  }
                } else {
                  PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                    if (result) {
                      if (__DEV__){
                          console.log("User accept");
                      }
                    } else {
                      if (__DEV__){
                          console.log("User refuse");
                      }
                    }
                  });
                }
          });
        }
    }

    onBLEManagerUpdateState = (newBLEState) => {
        console.log('onBLEManagerUpdateState: newBLEState = ', newBLEState);
        if (newBLEState == 'on'){
            if (this.props.scanOnMount == true){
                this.handleScan();
            }
        }else {
            // BleManager.start({showAlert: true});
        }
    }

    handleScan() {
        BleManager.scan(['180D'], this.props.scanTimeout, true)
            .then((results) => {console.log('Scanning...'); this.props.startScanning()});
    }

    handleDiscoverPeripheral = (data) => {
        this.props.onDiscovered(data);
    }

    handleCharacteristicChange = (d) => {
        this.props.onSensorDataReceived(d.peripheral, BLEHelper.getDataFromStringData(d.value));
    }

    render() {
      let bl = this.props.bluetooth;
      return (
          <View style={{height: 0}} >

            {this.props.maintainConnection == false ? null :
                <BLEConnectionMaintainer />
            }

        </View>

      );
    }

}

const mapStateToProps = (state) => {
    return {
        bluetooth: state.bluetooth
    }
}

let onDiscovered = (data) => {
    return dispatch => {
        let {id, name} = data;
        dispatch(sensorsActions.createSensor({id: id, name: name, shouldShow: true}))
        dispatch(bActions.onDiscovered(data));
    }
}

const mapDispatchToProps = (dispatch) => {
    return Object.assign({}, bindActionCreators(bActions, dispatch), {
        onDiscovered: (data) => {
            return dispatch(onDiscovered(data));
        }
    })
}



BluetoothComponent = connect(mapStateToProps, mapDispatchToProps)(BluetoothComponent)

export default BluetoothComponent;
