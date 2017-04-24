/**
 * Created by sabir on 23.12.16.
 */
/**
 * Created by sabir on 01.12.16.
 */

import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {switchTab} from '../../actions/NavigationActions'

import * as Colors from '../../constants/AppColors'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    ActivityIndicator,
    StatusBar
} from 'react-native';

//apps
import IndexApp from '../apps/IndexApp'
import SensorsApp from '../apps/SensorsApp'
import SettingsApp from '../apps/SettingsApp'
import TestsApp from '../apps/TestsApp'
import InfoApp from '../apps/InfoApp'

import Icon from 'react-native-vector-icons/FontAwesome';

import LangHelper from '../../helpers/LangHelper'

class IOSTabView extends Component {

    static defaultProps = {}

    static propTypes = {
        currentUser: PropTypes.object,
        initialized: PropTypes.bool
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

    onTabSelect = (tab) => {
        this.props.onTabSelect(tab);
    }

    getString = (name) => {
        let {lang} = this.props;
        return LangHelper.getString(name, lang, true);
    }

    render = () => {
        if (__DEV__){
            console.log('rendering IOSTabView');
        }
        let getString = this.getString;

        return (
            <TabBarIOS  tintColor={Colors.darkText} >

                <Icon.TabBarItemIOS
                    title={getString('home')}
                    selected={this.props.tab === 'index'}
                    iconName={'home'}
                    selectedIconColor={'red'}
                    onPress={this.onTabSelect.bind(this, 'index')} >
                    <IndexApp
                        navigator={this.props.navigator}
                    />

                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    title={getString('tests')}
                    selected={this.props.tab === 'tests'}
                    iconName={'flash'}
                    onPress={this.onTabSelect.bind(this, 'tests')} >
                    <TestsApp
                        navigator={this.props.navigator}
                    />

                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    title={getString('settings')}
                    selected={this.props.tab === 'settings'}
                    iconName={'gears'}
                    onPress={this.onTabSelect.bind(this, 'settings')} >
                    <SettingsApp
                        navigator={this.props.navigator}
                    />

                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    title={getString('info')}
                    selected={this.props.tab === 'info'}
                    iconName={'info-circle'}
                    onPress={this.onTabSelect.bind(this, 'info')} >
                    <InfoApp
                        navigator={this.props.navigator}
                    />

                </Icon.TabBarItemIOS>

            </TabBarIOS>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        tab: state.navigation.tab,
        lang: state.lang.lang
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTabSelect: (tab) => dispatch(switchTab(tab)),
    }
}

IOSTabView = connect(mapStateToProps, mapDispatchToProps)(IOSTabView)

export default IOSTabView
