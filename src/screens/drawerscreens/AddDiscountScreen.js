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
import { AddEditDiscount } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';
import { RadioButton } from 'react-native-paper';

const AddDiscountScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [errortext, setErrortext] = useState('');
    const [discountName, setDiscountName] = useState('');
    const [checked, setChecked] = React.useState('AMOUNT');
    const [userId, setUserId] = useState(0);
    const Idparam = route.params;
    const isAddMode = !Idparam || Idparam === undefined ? true : false;
    const rateInputRef = createRef();
    useEffect(() => {
        AsyncStorage.getItem('id').then(value => {
            setUserId(value)
            if (!isAddMode) {
                setLoading(true);
                let id = route.params.id
                fetch(`http://bustle.ticketplanet.ng/GetDiscountById/${id}/${value}`, {
                    method: 'Get',
                    headers: {
                        //Header Defination
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(responseJson => {
                        setLoading(false);
                        const fields = ['discountName', 'rate'];
                        fields.forEach(field => setValue(field, responseJson[field]));
                    }).catch(error => {
                        setLoading(false);
                        console.error(error);
                    });
            }
        })
    }, []);

    const addDiscount = (data) => {
        let updatedata = { ...data, "userId": parseInt(userId), discountType: checked };
        return AddEditDiscount(updatedata)
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
    const updateDiscount = (id, data) => {
        let updatedata = { ...data, "id": id, discountType: checked };
        return AddEditDiscount(updatedata)
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
            updateDiscount(route.params.id, data)
        else {
            let dataToSend = { ...data, "userId": parseInt(userId) };
            addDiscount(dataToSend)
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
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <RadioButton

                                    value="AMOUNT"
                                    status={checked === 'AMOUNT' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('AMOUNT')}
                                />
                            </View>
                            <View style={{
                                flex: 1, alignContent: 'center', justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{ fontSize: 10 }}>AMOUNT</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <RadioButton
                                    value="PERCENT"
                                    status={checked === 'PERCENT' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('PERCENT')}
                                />
                            </View>
                            <View style={{
                                flex: 1, alignContent: 'center', justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{ fontSize: 10 }}>PERCENT</Text>
                            </View>
                        </View>
                    </View>
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
                                    placeholder="Discount Name"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        rateInputRef.current && rateInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            )}
                            name="discountName"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.discountName && <Text style={styles.ErrorMesage}>Discount Name is required!</Text>}
                    </View>

                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    value={value ? value.toString() : value}
                                    style={styles.inputStyle}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(parseFloat(value))}
                                    underlineColorAndroid="#f000"
                                    placeholder="Rate"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                    ref={rateInputRef}
                                    returnKeyType="next"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                            )}
                            name="rate"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.rate && <Text style={styles.ErrorMesage}>Rate is required!</Text>}
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
export default AddDiscountScreen
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    SectionStyleImage: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        margin: 10,
    },
    textStyle: {
        padding: 10,
        color: 'black',
    },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        padding: 5,
    },
    imageStyle: {
        width: 50,
        height: 50,
        marginLeft: 50
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
    ErrorSectionStyle: {
        marginLeft: 35,
        marginRight: 35
    },
    ErrorMesage: {
        fontSize: 9,
        color: 'red'
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
