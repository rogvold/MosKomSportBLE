/**
 * Created by sabir on 15.01.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import * as actions from '../../../actions/LangActions'

 import {
     AppRegistry,
     StyleSheet,
     Text,
     Modal,
     View,
     TextInput,
     Navigator,
     TouchableHighlight,
     TouchableWithoutFeedback,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator
 } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as colors from '../../../constants/AppColors'

import LangText from '../../lang/LangText'

 class LanguagePanel extends React.Component {

     static defaultProps = {}

     static propTypes = {
         lang: PropTypes.string,
         setLang: PropTypes.func
     }

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     setLang = (lang) => {
         this.props.setLang(lang);
     }

     getLanguagesListComponent = () => {
         let arr = [{
             name: 'en',
             displayName: 'English'
         }, {
             name: 'ru',
             displayName: 'Русский'
         }];
         let currentLang = this.props.lang;
         return (
             <View style={styles.itemsPlaceholder} >
                 {arr.map((lang, k) => {
                     let key = 'lang_' + k;
                     let onClick = this.setLang.bind(this, lang.name);
                     let isSelected = (lang.name == currentLang);
                     return (
                         <TouchableHighlight key={key}
                                             underlayColor={'white'}
                                             style={styles.langItem} onPress={onClick} >
                             <View style={styles.langItemContent}>
                                 <View style={styles.checkboxPlaceholder}>
                                     {isSelected == false ?
                                         <Icon name="square-o" size={24} color={colors.lightText} /> :
                                         <Icon name="check-square-o" size={24} color={colors.darkText} />
                                     }
                                 </View>
                                 <View style={styles.namePlaceholder} >
                                     <Text style={[styles.name]} >
                                         {lang.displayName}
                                     </Text>
                                 </View>
                             </View>
                         </TouchableHighlight>
                     )
                 })}
             </View>
         )
     }

     render = () => {

         return (
             <View style={styles.container} >

                 <View style={styles.headerPlaceholder} >
                     <LangText style={styles.header} name={'LANGUAGE'} />
                 </View>

                 {this.getLanguagesListComponent()}

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
        marginBottom: 62,
        paddingTop: 20
     },

     headerPlaceholder: {
         marginBottom: 5
     },

     header: {
         fontSize: 24,
         color: colors.darkText,
         fontWeight: 'bold'
     },

     itemsPlaceholder: {

     },

     langItem: {
         // alignSelf: 'stretch',
         // flexWrap: 'wrap',
         // alignItems: 'flex-start',
         // flexDirection:'row',
         // height: 24,
         // // padding: 5,
         marginBottom: 5,
         marginTop: 5
     },

     langItemContent: {
         alignSelf: 'stretch',
         flexWrap: 'wrap',
         alignItems: 'flex-start',
         flexDirection:'row',
         height: 24,
     },

     checkboxPlaceholder: {
        height: 24,
        marginRight: 10
     },

     namePlaceholder: {
         justifyContent: 'center',
         alignSelf: 'stretch'
     },

     name: {
         color: colors.lightText
     }

 });


 const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        setLang: (lang) => {
            return dispatch(actions.setLang(lang))
        }
    }
 }

 LanguagePanel = connect(mapStateToProps, mapDispatchToProps)(LanguagePanel)

 export default LanguagePanel