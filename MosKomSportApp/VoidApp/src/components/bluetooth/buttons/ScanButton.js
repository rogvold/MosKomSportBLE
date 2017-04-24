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

import LangText from '../../lang/LangText'

import * as colors from '../../../constants/AppColors'

import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  Platform,
  PermissionsAndroid,
  Modal,
  ActivityIndicator,
  StyleSheet,
  Image
} from 'react-native';

import PureRenderMixin from 'react-addons-pure-render-mixin';

import Icon from 'react-native-vector-icons/FontAwesome';

class ScanButton extends React.Component {

    static defaultProps = {
        // scanTimeout: 5
        scanTimeout: 6
    }

    static propTypes = {
        bluetoothStatus: PropTypes.string
    }

    state = {

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

    scan = () => {
        console.log('scan is clicked');
        BleManager.scan(['180D'], this.props.scanTimeout, true)
            .then((results) => {console.log('Scanning...'); this.props.startScanning()});
    }

    getStatus = () => {
        return this.props.bluetoothStatus;
    }

    render() {
      let status = this.getStatus();
      if(__DEV__){
          console.log('ScanButton: render occured: status = ' + status);
      }


      if (status == constants.SCANNING){
            return (
                <View >
                    <Image
                        style={{width: 200, height: 150, alignSelf: 'center'}}
                        source={require('./img/scanning/scanning.gif')}
                    />
                </View>
            )
      }


      if (status == constants.SCANNING){
          return (
              <View style={{height: 50, borderRadius: 4, backgroundColor: 'powderblue',
                            alignItems: 'center', justifyContent: 'center'}} >
                    <ActivityIndicator animating={true} />
                    <Text style={{textAlign: 'center', fontSize: 18, }} >
                      scanning...
                    </Text>
              </View>
          )
      }

      return (
          <View style={styles.container}>

             <Icon.Button name="search" backgroundColor={colors.darkBackground}
                          style={styles.button}

                          onPress={() => {this.scan()}} >
                  <LangText name={'SCAN'} style={styles.scanText}  />
             </Icon.Button>

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

    button: {
        height: 50
    },

    scanText: {
        color: 'white',
        fontSize: 20
    }

});

const mapStateToProps = (state) => {
    return {
        bluetoothStatus: state.bluetooth.bluetoothStatus
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(bActions, dispatch)
}



ScanButton = connect(mapStateToProps, mapDispatchToProps)(ScanButton)

export default ScanButton;
