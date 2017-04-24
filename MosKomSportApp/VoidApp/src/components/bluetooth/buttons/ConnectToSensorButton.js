/**
 * Created by sabir on 01.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BleManager from 'react-native-ble-manager';

import * as bActions from '../../../actions/BluetoothActions';

import BLEHelper from '../../../helpers/BLEHelper'

import * as constants from '../../../constants/BluetoothConstants'

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


class ConnectToSensorButton extends React.Component {

    static defaultProps = {
        
    }

    static propTypes = {
        bluetooth: PropTypes.object,
        sensorId: PropTypes.string.isRequired
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

    }

    connect = () => {
        var sensorId = this.props.sensorId;
        this.props.connectToSensor(sensorId);
        var self = this;

        BleManager.connect(sensorId)
          .then((peripheralInfo) => {
            if (__DEV__){
                console.log('Sensor [' + sensorId + '] is connected. Starting notification enabling...');
            }
            BleManager.startNotification(sensorId, constants.HEART_RATE_SERVICE_UUID, constants.HEART_RATE_CHARACTERISTIC_UUID)
              .then(() => {
                if (__DEV__){
                    console.log('notification enabled, peripheralInfo = ', peripheralInfo);
                }
                self.props.connectToSensorSuccess(sensorId, peripheralInfo);
            })
            .catch((error) => {
              self.props.connectToSensorFail(sensorId);
            });
          })
          .catch((error) => {
            self.props.connectToSensorFail(sensorId);
          });
    }

    getStatus = () => {
        var bl = this.props.bluetooth;
        var map = bl.sensorsConnectionStatusMap;
        var sensorId = this.props.sensorId;
        return map[sensorId];
    }

    render() {
      let bl = this.props.bluetooth;
      let sensorId = this.props.sensorId;
      let status = this.getStatus();
      let canConnect = (status == constants.NOT_CONNECTED || status == constants.DISCOVERED);

      if (canConnect == false){
          return (
              <View>
                <Text>
                  {status}
                </Text>
              </View>
          )
      }

      return (
          <View>
            <TouchableHighlight style={{padding: 10, backgroundColor: 'steelblue', borderRadius: 4}} onPress={() => {this.connect()}} >
              <Text style={{color: 'white'}} >
                connect
              </Text>
            </TouchableHighlight>
          </View>
      );
    }

}

const mapStateToProps = (state) => {
    return {
        bluetooth: state.bluetooth
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(bActions, dispatch)
}



ConnectToSensorButton = connect(mapStateToProps, mapDispatchToProps)(ConnectToSensorButton)

export default ConnectToSensorButton;
