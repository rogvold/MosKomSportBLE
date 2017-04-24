/**
 * Created by sabir on 24.12.16.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Field, reduxForm } from 'redux-form'
// import { reduxForm } from 'redux-form/native'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Platform,
    BackAndroid,
    TextInput,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';

import TextField from '../../../fields/TextField'
import CheckboxField from '../../../fields/CheckboxField'

import LangText from '../../../lang/LangText'

import Icon from 'react-native-vector-icons/FontAwesome';

import * as colors from '../../../../constants/AppColors'

import LangHelper from '../../../../helpers/LangHelper'

const UpdateSensorForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, valid, lang } = props;
    return (
        <View onSubmit={handleSubmit} style={styles.container} >
            <LangText style={styles.label} name={'SENSOR_NAME'} />
            <Field name={'displayName'}
                   style={styles.input}
                   component={TextField} placeholder={'For example, "polar #23"'} />

            <Field name={'shouldShow'}
                   label={LangHelper.getString('SHOULD_SHOW_IN_TESTS', lang)}
                   component={CheckboxField} />

            <View style={styles.buttonPlaceholder} >
                <Icon.Button onPress={handleSubmit} style={styles.submitButton} name="save" backgroundColor="#3b5998">
                    <LangText style={styles.submitButtonText} name={'SAVE'} />
                </Icon.Button>
            </View>

            {props.cancelContent}

        </View>
    )
}

var styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    label: {
        fontWeight: 'bold',
        color: colors.darkText,
        marginBottom: 5
    },
    input: {
        padding: 5,
        borderRadius: 3,
        borderColor: colors.lightText,
        borderWidth: 1,
        height: 40
    },

    buttonPlaceholder: {
        marginTop: 20,
        flexWrap:'wrap',
        flexDirection: 'row'
    },

    submitButton: {
        // backgroundColor: 'steelblue',
        backgroundColor: colors.darkBackground,
        padding: 10,
        borderRadius: 3,
        height: 40,
        textAlign: 'center'
    },

    submitButtonText: {
        textAlign: 'center',
        color: 'white'
    }

});

const validate = values => {
    const errors = {}
    if (values.name == undefined || values.name.trim() == ''){
        errors.name = 'Name is empty'
    }
    return errors
}

export default reduxForm({
    syncValidation: validate,
    form: 'sensor_form'  // a unique identifier for this form
})(UpdateSensorForm)