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
import { UpdateSalesStatus } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';

const UpdateSalesDetailsScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [errortext, setErrortext] = useState('');
    const [userId, setUserId] = useState(0);
    const Idparam = route.params;

    const [isEnabled, setIsEnabled] = useState(false);
    const [sucessfullScreen, setSucessfullScreen] = useState(false);
    const [salesDetails, setSalesDetails] = useState({});
    const [statusList, setStatusList] = useState([
        "Canceled Sale",
        "Refund",
        "Paid",
        "UnPaid"]);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isCreditSale, setIsCreditSale] = useState(false);
    const toggleCreditSaleSwitch = () => setIsCreditSale(previousState => !previousState);
    const [checked, setChecked] = React.useState('POS');

    useEffect(() => {

        AsyncStorage.getItem('id').then(value => {
            setUserId(value)
            GetSaleItem(Idparam.id, value)

        })
    }, []);


    const GetSaleItem = (id, userId) => {
        setLoading(true);
        fetch(`http://bustle.ticketplanet.ng/GetSalesById/${id}/${userId}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setLoading(false);
                setSalesDetails(responseJson)
                const fields = ['status'];
                fields.forEach(field => setValue(field, responseJson[field]));
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const updateSalesStatus = (data) => {
        let updatedata = {
            ...data,
            Id: Idparam.id
        };
        return UpdateSalesStatus(updatedata)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Information', 'Status sucessfully updated')
                } else {
                    setErrortext(responseJson.responseText);
                }
            }).catch(error => {
                setLoading(false);
                console.error('erroe', error);
            });
    }
    const handleSubmitPress = data => {

        setErrortext('');
        setLoading(true);
        let dataToSend = { ...data };
        updateSalesStatus(dataToSend)
        setLoading(false);
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
                    <View style={styles.SectionStyleMultiline}>
                        <TextInput
                            value={salesDetails.salesDetails}
                            style={styles.inputStyleMultiline}
                            multiline={true}
                            numberOfLines={4}
                            editable={false}
                            underlineColorAndroid="#f000"
                            placeholder="Sales Details"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="default"
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            value={salesDetails.createDate}
                            style={styles.inputStyle}

                            editable={false}
                            underlineColorAndroid="#f000"
                            placeholder="Sales Details"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="default"
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            value={salesDetails.customerDetails}
                            style={styles.inputStyle}

                            editable={false}
                            underlineColorAndroid="#f000"
                            placeholder="CustomerDetails"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="default"
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            value={salesDetails.amount ? salesDetails.amount.toString() : null}
                            style={styles.inputStyle}
                            editable={false}
                            underlineColorAndroid="#f000"
                            placeholder="Amount"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="default"
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (

                                <Picker
                                    selectedValue={value}
                                    style={styles.inputStyle}
                                    onValueChange={(value, itemIndex) => onChange(value)}
                                >
                                    {statusList.map((item, key) =>
                                        <Picker.Item label={item} value={item} key={key} />
                                    )}
                                </Picker>

                            )}
                            name="status"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.status && <Text style={styles.ErrorMesage}>Status is required!</Text>}
                    </View>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmit(handleSubmitPress)}
                    >
                        <Text style={styles.buttonTextStyle}>{"UPDATE"}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </ScrollView>
        </View>
    )
}
export default UpdateSalesDetailsScreen
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    successTextStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    SectionStyleMultiline: {
        flexDirection: 'row',
        height: 80,
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
    },
    inputStyleMultiline: {
        flex: 1,
        color: 'black',
        borderWidth: 1,
        borderColor: '#dadae8',
    }

});
