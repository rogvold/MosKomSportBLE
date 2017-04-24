/**
 * Created by sabir on 25.12.16.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import * as actions from '../../../actions/CardioTestsActions'

 import CardsList from './CardsList'

 import SelectTestPanel from '../panels/SelectTestPanel'


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
     ActivityIndicator
 } from 'react-native';

 import Icon from 'react-native-vector-icons/FontAwesome';

 import LangText from '../../lang/LangText'

 import * as colors from '../../../constants/AppColors'

 class SensorsCardsPanel extends React.Component {

     static defaultProps = {}

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


     onCardClick = (id) => {
         const {selectedSensorsMap} = this.props;
         let newMap = Object.assign({}, selectedSensorsMap);
         if (newMap[id] == undefined){
             newMap = Object.assign({}, newMap, {[id]: 1});
         }else {
             newMap[id] = undefined;
         }
         this.props.selectSensors(newMap);
     }

     isAnythingSelected = () => {
         let selectedMap = this.props.selectedSensorsMap;
         for (let key in selectedMap){
             let s = selectedMap[key];
             if (s != undefined){
                 return true;
             }
         }
         return false;
     }

     render = () => {
         let {cards} = this.props;
         let selectedMap = this.props.selectedSensorsMap;
         let isAnythingSelected = this.isAnythingSelected();

         return (
             <View style={styles.container} >

                 {cards.length == 0 ?
                     <View >
                         <LangText style={styles.noConnectedText} name={'NO_DEVICES_FOUND'} />
                     </View> :
                     <CardsList cards={cards}
                                onCardClick={this.onCardClick}
                                selectedMap={selectedMap} />
                 }

                 {isAnythingSelected == false ?
                     <View style={styles.bottomPlaceholder}>
                         {cards.length == 0 ? null :
                             <View style={styles.selectSomethingPleasePlaceholder}>
                                 <LangText name={'SELECT_DEVICES_PLEASE'} style={styles.selectSomethingPleaseText} />
                             </View>
                         }
                     </View>
                     :
                     <View style={styles.bottomPlaceholder}>
                         <View style={styles.bottomPanel}>
                             <SelectTestPanel />
                         </View>
                     </View>
                 }

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         padding: 22,
         paddingTop: 0
     },

     noConnectedText: {
         textAlign: 'center',
         padding: 15,
         color: colors.inactiveText
     },

     selectSomethingPleasePlaceholder: {
         paddingBottom: 42,
     },

     selectSomethingPleaseText: {
        textAlign: 'center',
         color: colors.darkText,
         fontSize: 20,
         fontWeight: 'bold'
     },

     bottomPlaceholder: {
         zIndex: 2,
         position: 'absolute',
         backgroundColor: 'rgba(255, 255, 255, 0.6)',
         left: 0,
         right: 0,
         bottom: 40
     },

     bottomPanel: {
         backgroundColor: 'white',
         paddingBottom: 22,
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center'
     },

 });

 let getCards = (state) => {
     let map = state.sensors.sensorsMap;
     let {connectedSensorsMap} = state.bluetooth;
     let arr = [];
     for (var key in map){
         let s = map[key];
         if (s.shouldShow == true && connectedSensorsMap[s.id] != undefined){
             arr.push(s);
         }
     }
     arr.sort((a, b) => {
         if (a.id < b.id) return 1;
         if (a.id > b.id) return 1;
         return 0;
     })
     return arr;
 }


 const mapStateToProps = (state) => {
    return {
        selectedSensorsMap: state.cardioTest.selectedSensorsMap,
        cards: getCards(state)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        selectSensors: (sensorsMap) => {
            return dispatch(actions.selectSensors(sensorsMap))
        }
    }
 }

 SensorsCardsPanel = connect(mapStateToProps, mapDispatchToProps)(SensorsCardsPanel)

 export default SensorsCardsPanel