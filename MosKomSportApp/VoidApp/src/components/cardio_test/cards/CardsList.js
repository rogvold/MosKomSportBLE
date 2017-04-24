/**
 * Created by sabir on 25.12.16.
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
     ScrollView,
     TextInput,
     Navigator,
     TouchableHighlight,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator
 } from 'react-native';

 import CurrentSensorInfoSpan from '../../bluetooth/panels/CurrentSensorInfoSpan'

 import SensorItem from '../../storage/sensors/list/SensorItem'

 class CardsList extends React.Component {

     static defaultProps = {
         selectedMap: {},
         cards: PropTypes.array,

         onCardClick: (id) => {
            if (__DEV__){
                console.log('default: onCardClick: id = ', id);
            }
         }

     }

     static propTypes = {
         selectedMap: PropTypes.object,
         onCardClick: PropTypes.func
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

     isSelected = (id) => {
         let {selectedMap} = this.props;
         return (selectedMap[id] != undefined);
     }

     onCardClick = (id) => {
        if (__DEV__){
            console.log('onCardClick: id = ', id);
        }
        this.props.onCardClick(id);
     }

     render = () => {
         let {cards} = this.props;
         if (__DEV__){
             console.log('CardsList: render: cards = ', cards);
         }

         return (
             <ScrollView style={styles.container} >

                 <View style={styles.listPlaceholder} >
                     {cards.map( (card, k) => {
                         let key = 'card_' + k + '_' + card.id;
                         let isSelected = this.isSelected(card.id);
                         let st = [styles.card];
                         if (isSelected == true){
                             st.push(styles.selected);
                         }
                         let onClick = this.onCardClick.bind(this, card.id);
                         let number = +k + 1;

                         return (
                             <SensorItem
                                         key={key}
                                         id={card.id}
                                         number={number}
                                         isSelected={isSelected} onSensorClick={onClick} />
                         )

                     } )}
                 </View>

             </ScrollView>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         marginBottom: 200
     },

     listPlaceholder: {

     },


     top: {
        textAlign: 'center',
         color: 'black',
         fontSize: 20,
         alignSelf: 'center',
         flex: 1
     },

     bottom: {

     },

     card: {
         padding: 8,
         height: 50,
         backgroundColor: 'white',
         // borderWidth: 1,
         // borderColor: 'grey',
         margin: 5,
         borderRadius: 3

     },

     selected: {
         borderWidth: 3,
         borderColor: 'cadetblue',
         borderRadius: 3,
         backgroundColor: 'azure'
     }


 });


 const mapStateToProps = (state) => {
    return {
        bluetooth: state.bluetooth
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 CardsList = connect(mapStateToProps, mapDispatchToProps)(CardsList)

 export default CardsList