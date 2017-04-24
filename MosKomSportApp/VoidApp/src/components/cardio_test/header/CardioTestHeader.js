/**
 * Created by sabir on 27.12.16.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import CardioHelper from '../../../helpers/CardioHelper'
 import * as actions from '../../../actions/CardioTestsActions'

 import moment from 'moment';

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
     ActivityIndicator
 } from 'react-native';

 import * as colors from '../../../constants/AppColors'

 import LangHelper from '../../../helpers/LangHelper'

 class CardioTestHeader extends React.Component {

     static defaultProps = {
         name: 'N/A'
     }

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     getTimeElapsed = () => {
         if (this.props.startTimestamp == undefined){
             return 0;
         }
         let ms = (+new Date() - this.props.startTimestamp);
         return ms;
     }

     toggleStartStop = () => {
         let {startTimestamp} = this.props;
         if (startTimestamp == undefined){
             this.props.startTest();
         }else {
             this.props.stopTest();
         }
     }

     render = () => {
         let {startTimestamp, name, lang} = this.props;
         let timeElapsed = this.getTimeElapsed();
         let timeString = moment.utc(timeElapsed).format("mm:ss");

         return (
             <View style={styles.headerPlaceholder} >
                 <View style={styles.headerLeft} >
                     <Text style={styles.testName} >
                         {name}
                     </Text>
                 </View>
                 <View style={styles.timePlaceholder}>
                     <Text style={styles.time} >
                         {timeString}
                     </Text>
                 </View>
                 <View style={styles.headerRight} >
                     <TouchableHighlight style={styles.stopButton} onPress={this.toggleStartStop} >
                         <Text style={styles.stopButtonText} >
                             {startTimestamp == undefined ? LangHelper.getString('START', lang) : LangHelper.getString('STOP', lang)}
                         </Text>
                     </TouchableHighlight>
                 </View>
             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: 'white'
     },



     headerPlaceholder: {
         height: 50,
         // backgroundColor: '#0059C7',
         backgroundColor: colors.darkBackground,
         alignSelf: 'stretch',
         flexDirection: 'row',
         paddingLeft: 10,
         paddingRight: 10
     },

     stopButton: {
         padding: 10,
         borderRadius: 5,
         height: 36,
         borderWidth: 2,
         borderColor: 'white',
         justifyContent: 'center',
         width: 100,
         alignSelf: 'flex-end'
     },

     stopButtonText: {
         textAlign: 'center',
         color: 'white',
         fontSize: 24
     },

     testName: {
         color: 'white',
         fontSize: 24,
         // fontWeight: 'bold'
     },

     headerLeft: {
         flex: 1,
         justifyContent: 'center'
     },

     timePlaceholder: {
         flex: 1,
         justifyContent: 'center'
     },

     time: {
         textAlign: 'center',
         color: 'white',
         fontSize: 24
     },

     headerRight: {
         flex: 1,
         justifyContent: 'center'
     },

 });


const mapStateToProps = (state) => {
    return {
        dataMap: state.bluetooth.dataMap,
        startTimestamp: state.cardioTest.startTimestamp,
        sensors: CardioHelper.getCardioTestSensors(state),
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

 CardioTestHeader = connect(mapStateToProps, mapDispatchToProps)(CardioTestHeader)

 export default CardioTestHeader