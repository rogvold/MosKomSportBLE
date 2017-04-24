
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BleManager from 'react-native-ble-manager';

import * as bActions from '../../../actions/BluetoothActions';

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

class SensorDetailsPanel extends React.Component {

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



    getStatus = () => {
        var bl = this.props.bluetooth;
        var map = bl.sensorsConnectionStatusMap;
        var sensorId = this.props.sensorId;
        return map[sensorId];
    }

    getSensorData = () => {
        let sensorId = this.props.sensorId;
        let dataMap = this.props.bluetooth.dataMap;
        var arr = dataMap[sensorId];
        if (arr == undefined){
          arr = [];
        }
        return arr;
    }

    getLastData = () => {
        let arr = this.getSensorData();
        if (arr.length == 0){
          return undefined;
        }
        return arr[arr.length - 1];
    }

    getHeartRates = () => {
        let arr = this.getSensorData();
        return arr.map((p, k) => p.hr);
    }

    getSensor = () => {
        let  bl = this.props.bluetooth;
        let map = bl.discoveredSensorsMap;
        let sensorId = this.props.sensorId;
        return map[sensorId];
    }

    render() {
      let bl = this.props.bluetooth;
      let sensorId = this.props.sensorId;
      let data = this.getLastData();
      let sensor = this.getSensor();

      let heartRates = this.getHeartRates();


      return (
        <View style={{paddingTop: 42}} >

          <View>
              <Text style={{fontSize: 20, marginBottom: 20, textAlign: 'center'}} >
                 <Text style={{fontWeight: 'bold'}} >{sensor.name}</Text>
              </Text>
          </View>

          <View>
              <Text>
                  {heartRates.join(', ')}
              </Text>
          </View>

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



SensorDetailsPanel = connect(mapStateToProps, mapDispatchToProps)(SensorDetailsPanel)

export default SensorDetailsPanel;
