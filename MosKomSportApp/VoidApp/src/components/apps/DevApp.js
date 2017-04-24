/**
 * Created by sabir on 01.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Modal
} from 'react-native';

// import Chart from 'react-native-chart';


class DevApp extends React.Component {

    static defaultProps = {}

    static propTypes = {

    }

    state = {
        modalVisible: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }



    render() {
      return (
        <View style={styles.container} >

            <Text>
              this is dev app
            </Text>

            <TouchableHighlight onPress={() => {this.setState({modalVisible: true});}} >
                <Text>show modal</Text>
            </TouchableHighlight>


            <Modal
                  animationType={"fade"}
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {alert("Modal has been closed.")}}
                  >
             <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
              <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', flexDirection: 'column',
                                     alignItems: 'center', alignSelf: 'stretch',
                                     justifyContent: 'center', padding: 20}} >

                  <View style={{backgroundColor: 'white', padding: 10, alignSelf: 'stretch', borderWidth: 1,
                                minHeight: 300, borderRadius: 4}} >

                      <View style={{flex: 4}} >
                          <Text>Hello World!</Text>
                      </View>

                      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}} >
                          <View style={{flexDirection: 'column', alignItems: 'center', marginTop: 10}} >
                              <TouchableHighlight
                                  style={{padding: 10, borderRadius: 100, backgroundColor: 'steelblue',
                                    width: 150, alignSelf: 'center'}}
                                  onPress={() => {
                                  this.setState({modalVisible: false});
                              }}>

                                <Text style={{textAlign: 'center', color: 'white', fontSize: 18}} >
                                  close
                                </Text>

                              </TouchableHighlight>
                          </View>
                      </View>

                  </View>


              </View>
             </View>

            </Modal>




        </View>
      );
    }
}

const data = [[
    [0, 1],
    [1, 3],
    [3, 7],
    [4, 9],
]];

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        // width: 200,
        // height: 200
    },
    chart: {
        width: 200,
        height: 200,
    },
});


export default DevApp
