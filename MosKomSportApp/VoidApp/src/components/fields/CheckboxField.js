/**
 * Created by sabir on 18.01.17.
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

import Icon from 'react-native-vector-icons/FontAwesome';

class CheckboxField extends React.Component {

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

    onClick = () => {
        const { input: { value, onChange } } = this.props;
        let f = false;
        if (value == true){
            f = true;
        }
        f = !f;
        onChange(f);
    }

    render = () => {
        const { input: { value, onChange }, label } = this.props;
        if (__DEV__){
            console.log('CheckboxField: render: label = ', label);
            console.log('CheckboxField: render: this.props = ', this.props);
        }

        if (value == undefined || value == false){
            return (
                <TouchableHighlight {...this.props}  onPress={this.onClick} underlayColor={'white'}  >
                    <Text style={styles.textStyle} >
                        <Icon name={'square-o'} size={16} /> {label}
                    </Text>
                </TouchableHighlight>
            )
        }
        return (
            <TouchableHighlight {...this.props} onPress={this.onClick} underlayColor={'white'}  >
                <Text style={styles.textStyle} >
                    <Icon name={'check-square-o'} size={16} /> {label}
                </Text>
            </TouchableHighlight>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    textStyle: {
        fontSize: 16,
        paddingTop: 5
    }

});


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//TextField = connect(mapStateToProps, mapDispatchToProps)(TextField)

export default CheckboxField