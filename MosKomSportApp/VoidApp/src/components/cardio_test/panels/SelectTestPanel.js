/**
 * Created by sabir on 25.12.16.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import * as actions from '../../../actions/CardioTestsActions'

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

 import LangText from '../../lang/LangText'

 class SelectTestPanel extends React.Component {

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

     render = () => {
         let {lang} = this.props;

         return (
             <View style={styles.container} >

                 <TouchableHighlight style={styles.buttonPlaceholder} onPress={this.props.selectTest.bind(this, 'rufe')}>
                     <View>
                         <LangText name={'RUFE_TEST'} lang={lang} style={styles.buttonText} />
                     </View>
                 </TouchableHighlight>

                 <TouchableHighlight style={styles.buttonPlaceholder} onPress={this.props.selectTest.bind(this, 'step')}>
                     <View>
                         <LangText name={'STEP_TEST'} lang={lang} style={styles.buttonText} />
                     </View>
                 </TouchableHighlight>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         flexDirection: 'row',
         alignItems: 'center'
     },

     buttonPlaceholder: {
         flex: 1,
         height: 100,
         backgroundColor: colors.darkBackground,
         margin: 10,
         borderRadius: 20,
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center'
     },

     buttonText: {
         alignSelf: 'center',
         textAlign: 'center',
         color: 'white',
         fontSize: 30
     }


 });


 const mapStateToProps = (state) => {
    return {
        selectedSensorsMap: state.cardioTest.selectedSensorsMap,
        currentTestName: state.cardioTest.currentTestName,
        startTimestamp: state.cardioTest.startTimestamp
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        selectTest: (name) => {
            return dispatch(actions.selectTest(name))
        }
    }
 }

 SelectTestPanel = connect(mapStateToProps, mapDispatchToProps)(SelectTestPanel)

 export default SelectTestPanel