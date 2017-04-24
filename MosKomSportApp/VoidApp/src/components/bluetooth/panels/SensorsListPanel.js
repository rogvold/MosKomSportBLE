
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BleManager from 'react-native-ble-manager';

import * as bActions from '../../../actions/BluetoothActions';

import SensorsList from '../list/SensorsList';

import SensorDetailsPanel from './SensorDetailsPanel';

import PureRenderMixin from 'react-addons-pure-render-mixin';

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

class SensorsListPanel extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        bluetooth: PropTypes.object
    }

    state = {
        selectedSensorId: undefined
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillReceiveProps() {

    }

    componentDidMount = () => {

    }

    onSensorClick = (sensor) => {
        if (__DEV__){
            console.log('onSensorClick occured: sensor = ', sensor);
        }
        //
        // this.setState({
        //   selectedSensorId: sensor.id
        // });
    }

    render = () => {
      if (__DEV__){
        console.log('SensorsListPanel: render');
      }

      let modalVisible = (this.state.selectedSensorId != undefined);

      return (
        <View style={styles.container} >

          <SensorsList onSensorClick={this.onSensorClick} />

          {this.state.selectedSensorId == undefined ? null :
            <Modal
                      animationType={"slide"}
                      transparent={false}
                      visible={modalVisible}
                      onRequestClose={() => {alert("Modal has been closed.")}}
                      >

                      <View style={{marginTop: 22}}>
                       <View style={{padding: 10, justifyContent: 'center'}} >

                         <SensorDetailsPanel sensorId={this.state.selectedSensorId} />

                         <TouchableHighlight style={{padding: 20}}
                                      onPress={() => {
                                        this.setState({selectedSensorId: undefined});
                                      }}>
                                      <Text style={{textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}} >
                                          close
                                      </Text>
                         </TouchableHighlight>


                       </View>
                      </View>

            </Modal>
          }

        </View>
      );

    }

}

var styles = StyleSheet.create({

    container: {
        marginBottom: 200
    }

});

const mapStateToProps = (state) => {
    return {
        bluetooth: state.bluetooth
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(bActions, dispatch)
}



// SensorsListPanel = connect(mapStateToProps, mapDispatchToProps)(SensorsListPanel)

export default SensorsListPanel;
