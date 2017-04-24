
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BleManager from 'react-native-ble-manager';

import * as bActions from '../../../actions/BluetoothActions';

// import

import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  Modal
} from 'react-native';

import LangHelper from '../../../helpers/LangHelper'

import Icon from 'react-native-vector-icons/FontAwesome';

class CurrentSensorInfoSpan extends React.Component {

    static defaultProps = {
        style: {
            fontSize: 14
        }
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


    render =  () => {
        let bl = this.props.bluetooth;
        let {sensorId, lang, style} = this.props;

        let data = this.getLastData();
        let status = this.getStatus();
        // console.log('CurrentSensorInfoSpan: render: data = ', data);

        let text = LangHelper.getString('CONNECTED', lang, true);


        if (status == undefined){
            text = LangHelper.getString('NOT_CONNECTED', lang, true);
        }else {
            text = LangHelper.getString(status.toUpperCase(), lang, true);
        }

        if (data != undefined){
            text = data.hr;
            return (
                <Text>
                    <Icon name="heart-o" size={style.fontSize} color="#900" /> {text}
                </Text>
            )
        }

        return (
            <Text style={style} >
                {text}
            </Text>
        );
    }

}


var styles = StyleSheet.create({
    container: {

    },

    normal: {
        fontSize: 18
    },

    ok: {
        color: 'green'
    }

});

const mapStateToProps = (state) => {
    return {
        bluetooth: state.bluetooth,
        lang: state.lang.lang
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(bActions, dispatch)
}



CurrentSensorInfoSpan = connect(mapStateToProps, mapDispatchToProps)(CurrentSensorInfoSpan)

export default CurrentSensorInfoSpan;
