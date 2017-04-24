/**
 * Created by sabir on 24.12.16.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import * as actions from '../../../../actions/SensorsActions'

 import {
     AppRegistry,
     StyleSheet,
     Text,
     View,
     Navigator,
     TouchableHighlight,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator
 } from 'react-native';

 import UpdateSensorForm from '../forms/UpdateSensorForm'

import PureRenderMixin from 'react-addons-pure-render-mixin';

 class UpdateSensorPanel extends React.Component {

     static defaultProps = {
         onUpdated: () => {
             if (__DEV__){
                 console.log('updated');
             }
         }
     }

     static propTypes = {
         sensorId: PropTypes.string.isRequired,
         sensorsMap: PropTypes.object.isRequired,
         loading: PropTypes.bool.isRequired
     }

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     getSensor = () => {
        let {sensorsMap, sensorId} = this.props;
        let sensor = sensorsMap[sensorId];
        if (sensor == undefined){
            return {};
        }
        return sensor;
     }

     onSubmit = (data) => {
         if (__DEV__){
             console.log('onSubmit occured: data = ', data);
         }
         let d = Object.assign({}, this.getSensor(), data);
         this.props.saveSensor(d).then(
             () => this.props.onUpdated(),
             error => {}
         );
     }

     render = () => {
        const sensor = this.getSensor();
        let {lang} = this.props;
        if (__DEV__){
            console.log('rendering UpdateSensorPanel: seonsor = ', sensor);
        }

         return (
             <View style={styles.container} >

                <UpdateSensorForm initialValues={sensor} onSubmit={this.onSubmit} lang={lang} />

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         // flex: 1,
     },

 });


 const mapStateToProps = (state) => {
    return {
        loading: state.sensors.loading,
        sensorsMap: state.sensors.sensorsMap,
        lang: state.lang.lang
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        saveSensor: (data) => {
            return dispatch(actions.saveSensor(data));
        }
    }
 }

 UpdateSensorPanel = connect(mapStateToProps, mapDispatchToProps)(UpdateSensorPanel)

 export default UpdateSensorPanel