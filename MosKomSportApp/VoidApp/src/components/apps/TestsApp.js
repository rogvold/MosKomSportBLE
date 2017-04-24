/**
 * Created by sabir on 25.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/SensorsActions'

import SensorsPanel from '../storage/sensors/panels/SensorsPanel'

import SensorsCardsPanel from '../cardio_test/cards/SensorsCardsPanel'
import CardioTestsPanel from '../cardio_test/panels/CardioTestsPanel'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';



class TestsApp extends React.Component {

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
            <View style={styles.container} >

                <CardioTestsPanel />

            </View>
        );
    }

}


var styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        // backgroundColor: '#EEEEEE',
        // backgroundColor: '#00459F',
        // backgroundColor: '#ECF0F1',
        // backgroundColor: 'black',
        flex: 1
    },

});

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
    arr = arr.filter((a) => {
        return (a.name != a.displayName);
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



TestsApp = connect(mapStateToProps, mapDispatchToProps)(TestsApp)

export default TestsApp;