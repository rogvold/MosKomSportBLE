/**
 * Created by sabir on 15.01.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/SensorsActions'

import SensorsPanel from '../storage/sensors/panels/SensorsPanel'

import SensorsCardsPanel from '../cardio_test/cards/SensorsCardsPanel'
import CardioTestsPanel from '../cardio_test/panels/CardioTestsPanel'

import * as Progress from 'react-native-progress';

import * as colors from '../../constants/AppColors'

import Dimensions from 'Dimensions';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableHighlight,
    WebView,
    ScrollView
} from 'react-native';



class InfoApp extends React.Component {

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
        const {sensors, lang} = this.props;
        let HTML = ruHTML;
        if (lang == 'en'){
            HTML = enHTML;
        }

        return (
            <View style={styles.container} >


                <WebView style={{}}
                         scalesPageToFit={true}
                         source={{html: HTML}}
                />

            </View>
        );
    }

}


var styles = StyleSheet.create({
    container: {
        // paddingTop: 22,
        backgroundColor: 'pink',
        flex: 1,
    },

});


const ruHTML = `
        <!DOCTYPE html>\n
        <html>
          <head>
            <title>Hello Static World</title>
            <meta http-equiv="content-type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=320, user-scalable=no">
            <style type="text/css">
              body {
                margin: 0;
                padding: 0;
                font: 62.5% arial, sans-serif;
                background: white;
                padding: 5px;
              }
              h1 {
                margin: 0;
                font-size: 18px;
              }
              p{
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <h1>О программе</h1>
            <p>
                Программа предназначена для измерения физической подготовки человека с 
                помощью двух тестов - <b>Гарвардский степ-тест</b> и <b>тест Руфье</b>. 
            </p>
            <p>
                Приложение поддерживает датчки - мониторы сердечного ритма, 
                работающие по протоколу <b>Bluetooth 4.0 Smart</b>.
                Рекомендуется использовать такие датчики, как <b>Polar H7</b> (нагрудный ремень), 
                браслеты <b>Mio Alpha</b>, <b>Polar Loop</b> и другие. 
            </p>
            
            <h1>
                Подключение
            </h1>
            
            <p>
                Подключение датчиков осуществляется на главном экране приложения. 
                Необходимо нажать на кнопку "<b>Поиск устройств</b>", подождать 5 секунд, пока 
                программа обнаружит мониторы сердечного ритма. Программа автоматически начнет устанавливать соединение с датчиками.
                Статус подключения каждого датчика отображается под его названием.
            </p>
            
            <h1>
                Настройки
            </h1>
            
            <p>
                На экране "<b>Настройки</b>" вы можете переименовать обнаруженные устройства, 
                пометить галочкой датчики, которые вы используете. Те устройства, которые не помечены галочкой, будут игнорироваться программой.
                Так же вы можете выбрать рабочий язык (русский или английский).
            </p>
            
            
            <h1>
                Тесты
            </h1>
            
            <p>
                На экране "<b>Тесты</b>" нужно выбрать датчики пользователей, которых вы хотите измерить.
                Выберите один из тестов внизу экрана (2 большие кнопки).
            </p>
            
            <p>
                Верхнее меню каждого теста содержит название текущего теста, 
                время, прошедшее с начала теста, кнопку "Старт" или "Стоп".
                Нажмите кнопку "Старт", когда будете готовы начать тест.
            </p>
            
            <h1>
                Тест Руфье
            </h1>
            
            <p>
                Тест Руфье состоит из двух этапов. Первый - измерение числа пульсаций P1 в покое (15 секунд). 
                Второй - измерение после нагрузки.  
                Подсчитывается число пульсаций за первые 15 с (Р2), а потом — за последние 15 с 
                первой минуты периода восстановления (Р3). Индекс рассчитывается по формуле (4*(Р1 + Р2 + Р3) — 200)/10
            </p>
            
            <h1>
                Степ-тест
            </h1>
            
            <p>
                В режиме «Степ-тест» пульс измеряется на 2-й, 3-й и 4-й минутах отдыха в 
                течение 30 секунд (параметры f1, f2, f3). 
                Результат считается по формуле t * 100 / (2 * (f1 + f2 + f3)), 
                где t - время выполнения теста. 
                Рассчитываются показатели Score9 и Score12 - индексы для детей 9-10 (t=180) лет и 11-12 (t=240) соответственно.
            </p>
            
            <h1>
                Помощь
            </h1>
            <p>
                Вопросы и предложения вы можете задать по адресу 
                <a href="mailto:info@cardiomood.com" target="_blank" >info@cardiomood.com</a> или по телефону 
                <a href="tel:+79854363704">+79854363704</a>
            </p>
            
          </body>
        </html>
`;

const enHTML = `
        <!DOCTYPE html>\n
        <html>
          <head>
            <title>Hello Static World</title>
            <meta http-equiv="content-type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=320, user-scalable=no">
            <style type="text/css">
              body {
                margin: 0;
                padding: 0;
                font: 62.5% arial, sans-serif;
                background: white;
                padding: 5px;
              }
              h1 {
                margin: 0;
                font-size: 18px;
              }
              p{
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <h1>About</h1>
            <p>
                This application was developed to help conducting the Harvard step-test and Rufe test.
            </p>
            <p>
                It supports heart rate monitors working with Bluetooth 4.0 Smart.
                We recommend using such heart rate monitors as Polar H7, Mio Alpha, Polar Loot, etc.
            </p>
            
            <h1>
                Connection
            </h1>
            
            <p>
                You can connect your sensors on the Home screen of this app.
                Tap on the "Start scanning" button, wait for 5 seconds. 
                The app will try to connect to all discovered devices. 
                The connection status of each sensor is under its name.
            </p>
            
            <h1>
                Settings
            </h1>
            
            <p>
                You can rename and disable sensors on the Settings screen.
                You can also set the language of the app. We support English and Russian languages.
            </p>
            
            
            <h1>
                Tests
            </h1>
            
            <p>
                On the Tests screen you should select sensors of people you want to measure. Then select the test type.
            </p>
            
            <p>
                You can see the name of current test, time elapsed and buttons Start or Stop at the top of the Test page.
                As soon as you are ready to start press Start button.
            </p>
            
            <h1>
                Rufe Test
            </h1>
            
            <p>
                Rufe test consists of two steps. The first one is measuring the number of heart beats P1 
                in resting state (15 seconds).
                The second step goes after the physical exercises. 
                The app counts the number of heart beats for the first 15 seconds (P2) 
                of the first minute of resting and the 
                 for the last 15 seconds (P3). The result is calculated by this formula: (4*(Р1 + Р2 + Р3) — 200)/10
            </p>
            
            <h1>
                Step test
            </h1>
            
            <p>
                In "Step-test" mode the app counts heart beats for ranges 2min - 2:30min (f1), 
                3min - 3:30min (f2), 4min - 4:30min (f3), where time starts after the ending of the physical exercises.
                The result is t * 100 / (2 * (f1 + f2 + f3)), where t is time of exercises (in seconds).
            </p>
            
            <h1>
                Support
            </h1>
            <p>
                Please let us know if you have any questions.
                <a href="mailto:info@cardiomood.com" target="_blank" >info@cardiomood.com</a>, 
                <a href="tel:+79854363704">+79854363704</a>
            </p>
            
            
          </body>
        </html>
`;


const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

InfoApp = connect(mapStateToProps, mapDispatchToProps)(InfoApp)

export default InfoApp;