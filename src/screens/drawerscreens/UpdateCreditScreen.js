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
import { EditCredit } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';

const UpdateCreditScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, setValue, getValues, formState: { errors }, watch } = useForm();
    const [errortext, setErrortext] = useState('');
    const [creditorName, setCreditorName] = useState('');
    const [salesDetails, setSalesDetails] = useState('');
    const [salesAmount, setSalesAmount] = useState(0);
    const [amountRemaining, setAmountRemaining] = useState(0);
    const [isValidAmount, setIsValidAmount] = useState(true);
    const [payingAmount, setPayingAmount] = useState(0);
    const [userId, setUserId] = useState(0);
    useEffect(() => {
        AsyncStorage.getItem('id').then(value => {
            setUserId(value)
            setLoading(true);
            let id = route.params.id
            fetch(`http://bustle.ticketplanet.ng/GetSalesById/${id}/${value}`, {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(responseJson => {

                    setLoading(false);

                    setSalesAmount(responseJson.amount)
                    setSalesDetails(responseJson.salesDetails)
                    setCreditorName(responseJson.customerDetails)
                }).catch(error => {
                    setLoading(false);
                    console.error(error);
                });
        })
    }, []);

    const updateCredit = (id, data) => {
        let updatedata = { ...data, "id": id, "UserId": parseInt(userId) };
        console.log('update Cre', updatedata)
        return EditCredit(updatedata)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Success', responseJson.responseText)
                    setValue('amount', null)
                    setIsValidAmount(true)
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
        updateCredit(route.params.id, data)
    };
    const calculateCredit = (value) => {
        if (parseFloat(value ? value : 0) > salesAmount) {
            Alert.alert('Warning', 'Sorry the amount typed is greater than the amount left.')
            setIsValidAmount(true)
            setAmountRemaining(salesAmount)
        } else {
            setIsValidAmount(false)
            setAmountRemaining(salesAmount - parseFloat(value ? value : 0))
        }

    }
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
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text>Creditor: </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text>{creditorName}</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '700' }}>{salesDetails}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text>{salesAmount}</Text>
                        </View>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    value={value ? parseFloat(value) : value}
                                    style={styles.inputStyle}
                                    onBlur={onBlur}
                                    onChangeText={value => {
                                        setPayingAmount(value)
                                        onChange(parseFloat(value))
                                        calculateCredit(value)
                                    }}
                                    underlineColorAndroid="#f000"
                                    placeholder="Amount Paid"
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

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={{ flex: 1 }}>Amount Remaining</Text>
                        <Text style={{ flex: 1, textAlign: 'left' }}>{
                            amountRemaining
                        }</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        disabled={isValidAmount}
                        onPress={handleSubmit(handleSubmitPress)}
                    >
                        <Text style={styles.buttonTextStyle}>{"UPDATE"}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}
export default UpdateCreditScreen
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
