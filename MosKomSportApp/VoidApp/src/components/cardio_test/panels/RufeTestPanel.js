/**
 * Created by sabir on 26.12.16.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

import CardioHelper from '../../../helpers/CardioHelper'

import * as actions from '../../../actions/CardioTestsActions'
import CardioTestHeader from '../header/CardioTestHeader'

import LangText from '../../lang/LangText'

import LangHelper from '../../../helpers/LangHelper'

import * as colors from '../../../constants/AppColors'

 import * as Progress from 'react-native-progress';
 import Dimensions from 'Dimensions';

import Icon from 'react-native-vector-icons/FontAwesome';

 import {
     AppRegistry,
     StyleSheet,
     Text,
     Modal,
     View,
     TextInput,
     Navigator,
     TouchableHighlight,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator,
     ProgressBarAndroid,
     ProgressViewIOS
 } from 'react-native';

 class RufeTestPanel extends React.Component {

     static defaultProps = {
         firstPeriodDuration: 15 * 1000,
         secondPeriodDuration: 60 * 1000,

         secondDelta: 15 * 1000
     }

     static propTypes = {}

     state = {
         secondTimestamp: undefined
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
        // this.setState({
        //     secondTimestamp: undefined
        // });
     }

     componentWillReceiveProps() {

     }

     onSecondStart = () => {
         let now = +new Date();
         this.setState({
             secondTimestamp: now
         });
     }

     getFirstProgress = () => {
         let {startTimestamp, firstPeriodDuration} = this.props;
         if (startTimestamp == undefined){
             return undefined;
         }
         let now = +new Date();
         let dt = now - startTimestamp;
         return Math.min(1.0 * dt / firstPeriodDuration, 1.0);
     }

     getSecondProgress = () => {
         let {secondTimestamp} = this.state;
         let {secondPeriodDuration} = this.props;
         if (secondTimestamp == undefined){
             return undefined;
         }
         let now = +new Date();
         let dt = now - secondTimestamp;
         return Math.min(1.0 * dt / secondPeriodDuration, 1.0);
     }

     getProgressComponent = (progress) => {
         if (progress == undefined){
             return null;
         }
         if (progress >= 1){
             progress = 1;
         }
         if (Platform.OS == 'android'){
             return (
                 <ProgressBarAndroid styleAttr="Large" color="green" progress={progress} />
             )
         }
         if (Platform.OS == 'ios'){
             return (
                 <View style={{paddingTop: 10, paddingBottom: 10, height: 40}} >
                     <Progress.Bar height={15} borderColor={colors.cellBorder}
                                   width={Dimensions.get('window').width} borderRadius={0}
                                   progress={progress}
                                   animated={true} color={colors.darkBackground} />
                 </View>
             )
         }
         return null;
     }

     canStartSecond = () => {
         return (this.getFirstProgress() == 1.0);
     }

     isFinished = () => {
         let secondProgress = this.getSecondProgress();
         return (secondProgress >= 1);
     }

     getResData = (sensorId) => {
         let dataArr = CardioHelper.getSensorData(this.props.store, sensorId);
         let {startTimestamp, secondDelta, firstPeriodDuration, secondPeriodDuration} = this.props;
         if (startTimestamp == undefined){
             return {};
         }
         let {secondTimestamp} = this.state;
         if (secondTimestamp == undefined){
             secondTimestamp = +new Date() + 100000000;
         }
         let secondT = +secondTimestamp - +startTimestamp;
         dataArr = dataArr.map( (d, k) => {
             let b = Object.assign({}, d, {t: +d.t - +startTimestamp});
             return b;
         } )
         dataArr = dataArr.filter( (d) => {return (d.t >= 0)});
         let firstPool = [], secondPool = [], thirdPool = [];
         let minHR = 10000;
         let maxHR = 0;
         for (let i in dataArr){
             let d = dataArr[i];
             if (+d.hr > +maxHR){maxHR = d.hr;}
             if (+d.hr < +minHR){minHR = d.hr;}
             if (d.t < firstPeriodDuration){
                 firstPool.push(d);
             }
             if (d.t > secondT && d.t <= (secondT + secondDelta)){
                 secondPool.push(d);
             }

             if ((d.t > secondT + secondPeriodDuration - secondDelta) && d.t <= (secondT + secondPeriodDuration)){
                 thirdPool.push(d);
             }
         }
         if (__DEV__){
             console.log('getResData: firstPool = ', firstPool);
             console.log('getResData: secondPool = ', secondPool);
             console.log('getResData: thirdPool = ', thirdPool);
         }
         let n1 = 0, n2 = 0, n3 = 0;
         for (let i in firstPool){
             let d = firstPool[i];
             let dn = (d == undefined || d.rr == undefined) ? 0 : d.rr.length;
             n1 = n1 + dn;
         }
         for (let i in secondPool){
             let d = secondPool[i];
             let dn = (d == undefined || d.rr == undefined) ? 0 : d.rr.length;
             n2 = n2 + dn;
         }
         for (let i in thirdPool){
             let d = thirdPool[i];
             let dn = (d == undefined || d.rr == undefined) ? 0 : d.rr.length;
             n3 = n3 + dn;
         }
         let res = {
             n1: n1,
             n2: n2,
             n3: n3,
             minHR: minHR,
             maxHR: maxHR
         }
         if (n1 > 0 && n2 > 0 && n3 > 0){
             res.result = Math.round(((n1 + n2 + n3) * 4 - 200) / 1.0) / 10.0;
         }
         return res;
     }

     render = () => {
         let firstProgressComponent = this.getProgressComponent(this.getFirstProgress());
         let secondProgressComponent = this.getProgressComponent(this.getSecondProgress());
         let canStartSecond = this.canStartSecond();
         let isFinished = this.isFinished();


         let {secondTimestamp} = this.state;
         let {sensors, lang} = this.props;

         if (__DEV__){
             console.log('rendering RufeTestPanel: secondTimestamp = ', secondTimestamp);
         }

         return (
             <View style={styles.container} >

                 <CardioTestHeader name={LangHelper.getString('RUFE', lang)} />

                 {firstProgressComponent == undefined || secondProgressComponent != undefined ? null :
                     <View style={styles.progressPlaceholder} >
                         {firstProgressComponent}
                     </View>
                 }

                 {secondProgressComponent &&
                     <View style={styles.progressPlaceholder} >
                         {secondProgressComponent}
                     </View>
                 }


                 {(canStartSecond == false || secondProgressComponent != undefined) ? null :
                     <View style={styles.topControlsPlaceholder} >
                         <View style={styles.readyToStartSecondPlaceholder} >
                             <TouchableHighlight style={styles.startSecondButton} onPress={this.onSecondStart} >
                                 <View>
                                     <LangText name={'START_SECOND_STEP'}
                                               style={styles.secondStepText}
                                               lang={lang}  />
                                 </View>
                             </TouchableHighlight>
                         </View>
                     </View>
                 }


                 <View style={styles.sensorsPlaceholder} >

                     {sensors.map( (sensor, k) => {
                         let key = 'sensor_' + sensor.id;
                         let hr = CardioHelper.getCurrentHeartRate(this.props.store, sensor.id);
                         let res = this.getResData(sensor.id);

                         return (
                             <View key={key} style={styles.sensorItem} >

                                 <View style={styles.sensorLeft} >
                                        <View style={styles.sensorNamePlaceholder} >
                                            <Text style={styles.sensorName} >
                                                {sensor.displayName}
                                            </Text>
                                        </View>
                                     <View style={styles.sensorParamsPlaceholder} >

                                         <Text style={styles.paramText} >
                                             <Icon name="heart-o" size={16}
                                                   color="#900" /> min = {res.minHR == undefined || res.minHR == 10000 ? '?' : res.minHR}
                                         </Text>
                                         <Text style={styles.paramText} >
                                             <Icon name="heart-o" size={16}
                                                   color="#900" /> max = {res.maxHR == undefined || res.maxHR == 0 ? '?' : res.maxHR}
                                         </Text>


                                         <Text style={styles.paramText} >
                                             P1 = {res.n1 == undefined ? '?' : res.n1}
                                         </Text>
                                         <Text style={styles.paramText} >
                                             P2 = {res.n2 == undefined ? '?' : res.n2}
                                         </Text>
                                         <Text style={styles.paramText} >
                                             P3 = {res.n3 == undefined ? '?' : res.n3}
                                         </Text>
                                     </View>
                                 </View>

                                 <View style={styles.sensorCenter} >

                                     <Text style={styles.heartRateText} >
                                         <Icon name="heart-o" size={20} iconStyle={{marginRight: 5}}
                                               color="#900" /> {hr}
                                     </Text>

                                 </View>

                                 {isFinished == false ? null :
                                     <View style={styles.sensorRight} >
                                         <Text style={styles.resultText}>
                                             {res.result}
                                         </Text>
                                     </View>
                                 }


                             </View>
                         )

                     } )}

                 </View>


             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         marginBottom: 120
     },

     secondStepText: {
         textAlign: 'center',
         color: 'white',
         fontSize: 24
     },

     startSecondButton: {
         justifyContent: 'center',
         padding: 10,
         borderRadius: 10,
         backgroundColor: colors.darkBackground
     },

     readyToStartSecondPlaceholder: {

     },

     progressPlaceholder: {
         height: 20,
         justifyContent: 'center',
         alignSelf: 'stretch',
         backgroundColor: 'white'
     },

     topControlsPlaceholder: {
         backgroundColor: 'white',
         height: 80,
         padding: 5,
         flexDirection: 'row',
         justifyContent: 'center'
     },

     controlsInfoPlaceholder: {
         flex: 2,
         // backgroundColor: 'aliceblue'
     },

     controlsButtonPlaceholder: {
         flex: 1,
         // backgroundColor: 'azure'
     },

     sensorsPlaceholder: {

     },

     sensorItem: {
         height: 100,
         flexDirection: 'row',
         backgroundColor: 'white',
         margin: 5,
         borderRadius: 3
     },

     sensorLeft: {
         flex: 3,
         justifyContent: 'center',
         // backgroundColor: 'azure',
         flexDirection: 'column'
     },

     sensorNamePlaceholder: {
        flex: 2,
        alignSelf: 'stretch',
        justifyContent: 'center',
         paddingLeft: 5
     },

     sensorName: {
        fontWeight: 'bold',
         fontSize: 26
     },

     sensorParamsPlaceholder: {
         flex: 1,
         alignSelf: 'stretch',
         flexDirection: 'row'
     },

     paramText: {
        margin: 3,
        fontSize: 16
     },

     sensorCenter: {
        flex: 1,
        justifyContent: 'center',
        // justifyContent: 'flex-start',
         // backgroundColor: 'beige'
     },

     sensorRight: {
         flex: 1,
         justifyContent: 'center',
         backgroundColor: colors.darkBackground,
         borderRadius: 4
     },

     heartRate: {

     },

     heartRateText: {
         textAlign: 'center',
         fontSize: 32,
         fontWeight: 'bold'
     },

     resultText: {
         fontSize: 32,
         fontWeight: 'bold',
         textAlign: 'center',
         color: 'white'
     }

 });


const mapStateToProps = (state) => {
    return {
        dataMap: state.bluetooth.dataMap,
        startTimestamp: state.cardioTest.startTimestamp,
        sensors: CardioHelper.getCardioTestSensors(state),
        store: state,
        lang: state.lang.lang
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        stopTest: () => {
            return dispatch(actions.stopTest());
        },
        startTest: () => {
            return dispatch(actions.startTest());
        }
    }
}

 RufeTestPanel = connect(mapStateToProps, mapDispatchToProps)(RufeTestPanel)

 export default RufeTestPanel