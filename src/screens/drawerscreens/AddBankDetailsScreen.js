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
import { AddBankDetails } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';

const AddBankDetailsScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [errortext, setErrortext] = useState('');
    const [bankList, setBankList] = useState([]);
    const [userId, setUserId] = useState(0);
    const Idparam = route.params;
    const isAddMode = !Idparam || Idparam === undefined ? true : false;
    const accountNameDescInputRef = createRef();
    const bankInputRef = createRef();

    useEffect(() => {
        AsyncStorage.getItem('id').then(value => {
            setUserId(value)
            GetAllBanks()
            if (!isAddMode) {
                setLoading(true);
                let id = route.params.id
                fetch(`http://bustle.ticketplanet.ng/GetBankAccountById/${id}/${value}`, {
                    method: 'Get',
                    headers: {
                        //Header Defination
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(responseJson => {
                        setLoading(false);
                        console.log('edit', responseJson)
                        const fields = ['accountName', 'accountNo', 'bankId'];
                        fields.forEach(field => setValue(field, responseJson[field]));
                    }).catch(error => {
                        setLoading(false);
                        console.error(error);
                    });
            }
        })
    }, []);
    const GetAllBanks = () => {
        fetch(`http://bustle.ticketplanet.ng/GetAllBanks`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setBankList(responseJson)
            }).catch(error => {
                console.error(error);
            });
    }
    const addAccountDetails = (data) => {
        let updatedata = { ...data, "userId": parseInt(userId) };
        console.log('send', updatedata)
        return AddBankDetails(updatedata)
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
    const updateAccountDetals = (id, data) => {
        let updatedata = { ...data, "id": id };
        return AddBankDetails(updatedata)
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
            updateAccountDetals(route.params.id, data)
        else {
            let dataToSend = { ...data, "userId": parseInt(userId) };
            addAccountDetails(dataToSend)
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
                                    placeholder="Account Number"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="numeric"
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        accountNameDescInputRef.current && accountNameDescInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            )}
                            name="accountNo"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.accountNo && <Text style={styles.ErrorMesage}>Account Number is required!</Text>}
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
                                    placeholder="Account Name"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                    ref={accountNameDescInputRef}
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        bankInputRef.current && bankInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            )}
                            name="accountName"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.accountName && <Text style={styles.ErrorMesage}>Account Name is required!</Text>}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (

                                <Picker
                                    selectedValue={value ? value.toString() : value}
                                    style={styles.inputStyle}
                                    ref={bankInputRef}
                                    onValueChange={(value, itemIndex) => value ? onChange(parseInt(value)) : onChange(value)}
                                >
                                    <Picker.Item label="-Select Bank-" value="" />

                                    {bankList.map((item, key) =>
                                        <Picker.Item label={item.bankName} value={item.id.toString()} key={key} />
                                    )}
                                </Picker>

                            )}
                            name="bankId"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.bankId && <Text style={styles.ErrorMesage}>Bank is required!</Text>}
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
export default AddBankDetailsScreen
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
