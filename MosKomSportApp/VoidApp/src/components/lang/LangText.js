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
     TextInput,
     Navigator,
     TouchableHighlight,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator
 } from 'react-native';

 import langFactory from '../../data/LangDataFactory'

 class LangText extends React.Component {

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
         let {style, name, lang} = this.props;
         if (style == undefined || name == undefined){
             style = {};
         }
         name = name.toUpperCase();
         let d = langFactory[name];
         if (d == undefined){
             return null;
         }
         let text = d[lang];

         return (
             <Text style={style} >
                 {text}
             </Text>
         )
     }

 }

 var styles = StyleSheet.create({
     // container: {
     //     flex: 1,
     // },

 });


 const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 LangText = connect(mapStateToProps, mapDispatchToProps)(LangText)

 export default LangText