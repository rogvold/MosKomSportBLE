/**
 * Created by sabir on 24.12.16.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Platform,
    BackAndroid,
    ActivityIndicator,
    TouchableHighlight,
    Image
} from 'react-native';

import * as colors from '../../../../constants/AppColors'

import SensorItem from './SensorItem'

class SensorsList extends React.Component {

    static defaultProps = {
        sensors: [],
        shouldShowCheck: false,
        onSensorClick: (s) => {
            if (__DEV__){
                console.log('onClick', s);
            }
        }
    }

    static propTypes = {
        sensors: PropTypes.array
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

    render = () => {
        let {sensors, shouldShowCheck} = this.props;

        return (
            <View>

                {sensors.map((sensor, k) => {
                    let number = +k + 1;
                    let onPress = this.props.onSensorClick.bind(this, sensor);
                    return (
                        <View key={sensor.id} >
                            <SensorItem
                                shouldShowCheck={shouldShowCheck}
                                id={sensor.id} number={number} onSensorClick={onPress} />
                        </View>
                    )
                })}

            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#23242A',
    },

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

//SensorsList = connect(mapStateToProps, mapDispatchToProps)(SensorsList)

export default SensorsList