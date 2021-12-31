import React, { createRef, useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    Image,
    Switch,
    TouchableOpacity,
    Alert
} from 'react-native'
import Loader from '../components/Loader';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from "react-hook-form";
import { EditExpenseType } from '../utility/UserService'
import { AddExpenseType } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';



const AddExpenseTypeScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(0);
    const [errortext, setErrortext] = useState('');
    const Idparam = route.params;
    const isAddMode = !Idparam || Idparam === undefined ? true : false;

    useEffect(() => {
        AsyncStorage.getItem('id').then(value => {
            setUserId(value)
            if (!isAddMode) {
                setLoading(true);
                let id = route.params.id
                fetch(`http://bustle.ticketplanet.ng/GetExpenseTypeById/${id}/${value}`, {
                    method: 'Get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(responseJson => {
                        setLoading(false);
                        const fields = ['expenseTypeName'];
                        fields.forEach(field => setValue(field, responseJson[field]));
                    }).catch(error => {
                        setLoading(false);
                        console.error(error);
                    });
            }
        })
    }, []);
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const addExpenseType = (data) => {
        let updatedata = { ...data, "userId": parseInt(userId) };
        return AddExpenseType(updatedata)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Success', responseJson.responseText)
                } else {
                    setErrortext(responseJson.responseText);
                }
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const updateExpenseType = (id, data) => {
        let updatedata = { ...data, "id": id };
        return EditExpenseType(updatedata)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Success', responseJson.responseText)
                } else {
                    setErrortext(responseJson.responseText);
                }
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const handleSubmitPress = data => {
        setErrortext('');
        setLoading(true);
        if (!isAddMode)
            updateExpenseType(route.params.id, data)
        else {
            let dataToSend = { ...data, "userId": parseInt(userId) };
            addExpenseType(dataToSend)
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    value={value}
                                    style={styles.inputStyle}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    underlineColorAndroid="#f000"
                                    placeholder="Expense Type"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                            )}
                            name="expenseTypeName"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.expenseTypeName && <Text style={styles.ErrorMesage}>Expense Type is required!</Text>}
                    </View>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmit(handleSubmitPress)}
                    >
                        <Text style={styles.buttonTextStyle}>{isAddMode ? "CREATE" : "UPDATE"}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </ScrollView>
        </View>
    )
}

export default AddExpenseTypeScreen
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    MultiSectionStyle: {
        flexDirection: 'row',
        height: 80,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    }
});
