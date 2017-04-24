/**
 * Created by sabir on 16.01.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import {
     AppRegistry,
     StyleSheet,
     Text,
     Modal,
     View,
     ScrollView,
     TextInput,
     Navigator,
     TouchableHighlight,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     Image,
     ActivityIndicator
 } from 'react-native';

 import * as colors from '../../../../constants/AppColors'

 import PureRenderMixin from 'react-addons-pure-render-mixin';

import Icon from 'react-native-vector-icons/FontAwesome';

import CurrentSensorInfoSpan from '../../../bluetooth/panels/CurrentSensorInfoSpan'

 class SensorItem extends React.Component {

     static defaultProps = {
         isSelected: false,
         shouldShowCheck: false
     }

     static propTypes = {
         isSelected: PropTypes.bool,
         id: PropTypes.string,
         onSensorClick: PropTypes.func.isRequired
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
         let {id, sensorsMap} = this.props;
         let sensor = sensorsMap[id];
         return sensor;
     }

     getImage = () => {
         let source = require('./img/round_polar/round_polar.png');
         let sensor = this.getSensor();
         if (sensor == undefined){
             return null;
         }
         let name = sensor.name;
         if (name != undefined && name.toLowerCase().indexOf('mio') != -1){
             source = require('./img/round_mio/round_mio.png');
         }
         if (name != undefined && (name.toLowerCase().indexOf('loop') != -1 || name.toLowerCase().indexOf('fuse') != -1 )){
             source = require('./img/round_loop/round_loop.png');
         }
         return (
             <Image
                 shadowColor={'grey'}
                 style={styles.image}
                 source={source} />
         )
     }

     render = () => {
         let {number, onSensorClick, isSelected, shouldShowCheck} = this.props;
         let sensor = this.getSensor();
         if (sensor == undefined){
             return null;
         }
         let st = [styles.listItem];
         if (isSelected == true){
            st.push(styles.selectedItem);
         }

         return (
             <TouchableHighlight style={st}
                                 underlayColor={'white'}
                                 activeOpacity={0.9}
                                 onPress={onSensorClick} >
                 <View style={styles.leftRightPlaceholder} >

                     <View style={styles.imagePlaceholder}>
                         {this.getImage()}
                     </View>

                     <View style={styles.rightPlaceholder}>
                         <Text style={styles.listItemText}>
                             {(sensor.displayName == undefined || sensor.displayName.trim() == '' ) ? 'No name' : sensor.displayName}
                         </Text>
                         <Text style={styles.listItemBottomText}>
                             {sensor.name} {shouldShowCheck == false || sensor.shouldShow == false ? '' :
                                <Icon name={'check'} color={colors.darkText} />
                             }
                         </Text>
                         <CurrentSensorInfoSpan sensorId={sensor.id} style={styles.statusText} />
                     </View>

                     <View style={styles.numberPlaceholder} >
                         <View style={styles.num} >
                             <Text style={styles.numText} >
                                 {number}
                             </Text>
                         </View>
                     </View>

                 </View>
             </TouchableHighlight>
         )
     }

 }

 var styles = StyleSheet.create({

     listItem: {
         backgroundColor: 'whitesmoke',
         marginBottom: 10,
         padding: 5,
         borderRadius: 10,
         height: 90
     },

     selectedItem: {
        backgroundColor: 'wheat'
     },

     statusText: {
         color: colors.inactiveText,
         fontSize: 12
     },

     numberPlaceholder: {
         position: 'absolute',
         top: 0,
         left: 0,
         height: 40,
         width: 40,
         padding: 5,
         paddingLeft: 0,
         borderRadius: 15,
         backgroundColor: 'transparent'
         // backgroundColor: 'wheat',
         // borderBottomRightRadius: 5,
     },

     num: {
         width: 20,
         height: 20,
         borderRadius: 10,
         borderWidth: 1,
         borderColor: 'whitesmoke',
         // borderColor: colors.lightText,
         // borderColor: 'white',
     },

     numText: {
         textAlign: 'center',
         fontWeight: 'bold',
         color: colors.darkText
     },

     leftRightPlaceholder: {
         flex: 1,
         alignSelf: 'stretch',
         flexWrap: 'wrap',
         alignItems: 'flex-start',
         flexDirection:'row'
     },

     imagePlaceholder: {
         width: 90,
         // backgroundColor: 'green'
     },

     image: {
         borderRadius: 40,
         // borderWidth: 2,
         // borderColor: 'wheat',
         width: 80,
         height: 80
     },

     rightPlaceholder: {
         // backgroundColor: 'yellow',
         justifyContent: 'center',
         // alignItems: 'center',
         alignSelf: 'stretch'
     },



     listItemText: {
         fontSize: 24,
         fontWeight: 'bold',
         color: colors.darkText
         // alignSelf: 'center'
     },

     listItemBottomText: {
         fontSize: 14,
         color: colors.inactiveText,
         // color: 'grey'
     }

 });

let getSensorById = (state, id) => {

}

 const mapStateToProps = (state) => {
    return {
        sensorsMap: state.sensors.sensorsMap,
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 SensorItem = connect(mapStateToProps, mapDispatchToProps)(SensorItem)

 export default SensorItem