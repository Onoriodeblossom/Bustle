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
import { AddPurchase } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const AddPurchaseScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [errortext, setErrortext] = useState('');
    const [userId, setUserId] = useState(0);
    const Idparam = route.params;
    const isAddMode = !Idparam || Idparam === undefined ? true : false;
    const quantityInputRef = createRef();
    const amountInputRef = createRef();
    useEffect(() => {
        AsyncStorage.getItem('id').then(value => {
            setUserId(value)
            if (!isAddMode) {
                setLoading(true);
                let id = route.params.id
                fetch(`http://bustle.ticketplanet.ng/GetPurchaseById/${id}/${value}`, {
                    method: 'Get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(responseJson => {
                        setLoading(false);
                        const fields = ['productName', 'quantity', 'amount'];
                        fields.forEach(field => setValue(field, responseJson[field]));
                    }).catch(error => {
                        setLoading(false);
                        console.error(error);
                    });
            }
        })
    }, []);

    const addPurchase = (data) => {
        var Currentdate = moment().format('YYYY-MM-DD')
        let updatedata = { ...data, "userId": parseInt(userId), createDate: Currentdate };
        return AddPurchase(updatedata)
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
    const updatePurchase = (id, data) => {
        let updatedata = { ...data, "id": id };
        return AddPurchase(updatedata)
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
            updatePurchase(route.params.id, data)
        else {
            let dataToSend = { ...data, "userId": parseInt(userId) };
            addPurchase(dataToSend)
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
                                    placeholder="Product Name"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        quantityInputRef.current && quantityInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            )}
                            name="productName"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.productName && <Text style={styles.ErrorMesage}>Product Name is required!</Text>}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    value={value ? value.toString() : value}
                                    style={styles.inputStyle}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(parseInt(value))}
                                    underlineColorAndroid="#f000"
                                    placeholder="Quantity"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="numeric"
                                    returnKeyType="next"
                                    ref={quantityInputRef}
                                    onSubmitEditing={() =>
                                        amountInputRef.current && amountInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            )}
                            name="quantity"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.quantity && <Text style={styles.ErrorMesage}>Quantity is required!</Text>}
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
                                    placeholder="Amount"
                                    ref={amountInputRef}
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="numeric"
                                    returnKeyType="next"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                            )}
                            name="amount"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.amount && <Text style={styles.ErrorMesage}>Amount is required!</Text>}
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
export default AddPurchaseScreen
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
