/**
 * Created by sabir on 25.12.16.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import * as actions from '../../../actions/CardioTestsActions'

 import StepTestPanel from './StepTestPanel'
 import RufeTestPanel from './RufeTestPanel'

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

 import SensorsCardsPanel from '../cards/SensorsCardsPanel'

 import LangHelper from '../../../helpers/LangHelper'

 import LangText from '../../lang/LangText'

 class CardioTestsPanel extends React.Component {

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

     isSelected = () => {
         return ( this.props.cardioTest.currentTestName != undefined)
     }

     isStarted = () => {
         return ( this.props.cardioTest.startTimestamp != undefined)
     }

     stopTest = () => {

     }

     render = () => {
         let isSelected = this.isSelected();
         let isStarted = this.isStarted();
         let testName = this.props.cardioTest.currentTestName;
         let {lang} = this.props;

         return (
             <View style={styles.container} >

                 {isSelected == true ? null :
                    <SensorsCardsPanel />
                 }

                 {isSelected == false ? null :
                     <View>

                         {isStarted == true ?
                             null
                             :
                             <View style={styles.cancelTestButtonPlaceholder} >

                                 <TouchableHighlight
                                     style={styles.cancelTestButton}
                                     onPress={this.props.stopTest} >
                                     <View>
                                         <LangText name={'CANCEL'}
                                                   lang={lang}
                                                   style={styles.cancelTestButton} />
                                     </View>
                                 </TouchableHighlight>

                             </View>
                         }


                         {testName == 'rufe' ?
                             <ScrollView>
                                <RufeTestPanel />
                             </ScrollView>
                             :
                             <ScrollView>
                                 <StepTestPanel />
                             </ScrollView>
                         }

                     </View>
                 }

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: 'white'
         // backgroundColor: 'gainsboro'
     },

     testNameText: {
         padding: 10,
         textAlign: 'center',
         marginBottom: 10
     },

     cancelTestButton: {
         padding: 10,
         height: 40,
         textAlign: 'center',
         justifyContent: 'center',
         // backgroundColor: 'azure',
         // borderRadius: 10,
         // borderWidth: 3,
     },

     cancelTestButtonText: {
        textAlign: 'center',
         // color: 'white'
     },

     cancelTestButtonPlaceholder: {
         justifyContent: 'center'
     }

 });


 const mapStateToProps = (state) => {
    return {
        cardioTest: state.cardioTest,
        lang: state.lang.lang
    }
 }



 const mapDispatchToProps = (dispatch) => {
    return {
        startTest: () => {
            return dispatch(actions.startTest());
        },
        stopTest: () => {
            return dispatch(actions.stopTest());
        }
    }
 }

 CardioTestsPanel = connect(mapStateToProps, mapDispatchToProps)(CardioTestsPanel)

 export default CardioTestsPanel