/**
 * Created by sabir on 23.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Platform,
    BackAndroid,
    ActivityIndicator
} from 'react-native';


import IndexApp from '../apps/IndexApp';
import SensorsApp from '../apps/SensorsApp';

import {switchTab} from '../../actions/NavigationActions'

import IOSTabView from './IOSTabView'

class AppNavigator extends React.Component {

    static defaultProps = {}

    static childContextTypes = {
        addBackButtonListener: PropTypes.func,
        removeBackButtonListener: PropTypes.func,
    }

    static propTypes = {
        currentUser: PropTypes.object,
        initialized: PropTypes.bool
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    _handlers: []

    componentDidMount = () => {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount = () => {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    getChildContext = () => {
        return {
            addBackButtonListener: this.addBackButtonListener,
            removeBackButtonListener: this.removeBackButtonListener,
        };
    }

    addBackButtonListener = (listener) => {
        this._handlers.push(listener);
    }

    removeBackButtonListener = (listener) => {
        this._handlers = this._handlers.filter((handler) => handler !== listener);
    }

    handleBackButton = () => {
        for (let i = this._handlers.length - 1; i >= 0; i--) {
            if (this._handlers[i]()) {
                return true;
            }
        }

        const {navigator} = this.refs;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }

        // if (this.props.tab !== 'schedule') {
        //   this.props.dispatch(switchTab('schedule'));
        //   return true;
        // }
        return false;
    }

    render = () => {
        return (
            <Navigator
                ref="navigator"
                style={styles.container}
                configureScene={(route) => {
            if (Platform.OS === 'android') {
              return Navigator.SceneConfigs.FloatFromBottomAndroid;
            }
            // TODO: Proper scene support
            if (route.shareSettings || route.friend) {
              return Navigator.SceneConfigs.FloatFromRight;
            } else {
              return Navigator.SceneConfigs.FloatFromBottom;
            }
          }}
                initialRoute={{}}
                renderScene={this.renderScene}
            />
        );
    }

    renderScene = (route, navigator) => {
        if (__DEV__){
            console.log('renderScene: route, navigator = ', route, navigator);
        }

        // if (route.login) {
        //     console.log('rendering login app');
        //     return (
        //         <LoginApp
        //             navigator={navigator}
        //             onLogin={route.callback}
        //         />
        //     );
        // }
        //
        // if (route.profile) {
        //     console.log('rendering profile app');
        //     return (
        //         <ProfileApp
        //             navigator={navigator}
        //         />
        //     );
        // }


        console.log('rendering IOSTabView');
        return <IOSTabView navigator={navigator} />;
    }

}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#23242A',
    },
});

function select(store) {
    return {
        tab: store.navigation.tab,
        isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    };
}

const mapStateToProps = (state) => {
    return {
        tab: state.navigation.tab
    }
}

AppNavigator = connect(mapStateToProps, null)(AppNavigator)

export default AppNavigator
