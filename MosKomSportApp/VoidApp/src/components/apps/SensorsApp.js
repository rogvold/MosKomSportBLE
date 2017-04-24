/**
 * Created by sabir on 23.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/SensorsActions'

import SensorsPanel from '../storage/sensors/panels/SensorsPanel'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';



class SensorsApp extends React.Component {

    static defaultProps = {}

    static propTypes = {
        sensors: PropTypes.array.isRequired,
        loading: PropTypes.bool
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.loadSensors();
    }

    componentWillReceiveProps() {

    }


    render = () => {
        const {sensors} = this.props;

        return (
            <View style={{padding: 22}} >

                <SensorsPanel sensors={sensors} />

            </View>
        );
    }

}

let getSensors = (map) => {
    let arr = [];
    for (var key in map){
        arr.push(map[key]);
    }
    arr.sort((a, b) => {
        if (a.id > b.id) {return 1}
        if (a.id < b.id) {return -1}
        return 0;
    });
    return arr;
}

const mapStateToProps = (state) => {
    return {
        loading: state.sensors.loading,
        sensorsMap: state.sensors.sensorsMap,
        sensors: getSensors(state.sensors.sensorsMap)
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}



SensorsApp = connect(mapStateToProps, mapDispatchToProps)(SensorsApp)

export default SensorsApp;