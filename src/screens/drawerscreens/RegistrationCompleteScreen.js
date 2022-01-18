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
import AsyncStorage from '@react-native-community/async-storage';
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { useForm, Controller } from "react-hook-form";
import { EditProfile } from '../utility/UserService'
import { UserDetails } from '../utility/StaticData'

const RegistrationCompleteScreen = ({ route, navigation }) => {
    const [profileDetails, setProfileDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(0);
    const [profileCompleted, setProfileCompleted] = useState(false);
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [errortext, setErrortext] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const businessNameInputRef = createRef();
    const industryInputRef = createRef();
    const countryInputRef = createRef();
    const stateInputRef = createRef();

    useEffect(() => {
        AsyncStorage.getItem('id').then(value => {
            setUserId(value)
            GetProfileDetails(value)
        });
    }, []);
    const GetProfileDetails = (userId) => {
        setLoading(true);
        fetch(`http://bustle.ticketplanet.ng/GetUserProfile/${userId}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setLoading(false);
                console.log('settings', responseJson)
                setProfileDetails(responseJson)
                setProfileCompleted(JSON.parse(responseJson.profileCompleted))
                setFirstName(responseJson.firstName)
                setLastName(responseJson.lastName)
                setValue('phoneNumber', responseJson.phoneNumber)
                setValue('businessName', responseJson.businessName)
                setValue('industryType', responseJson.industryType)
                setValue('country', responseJson.country)
                setValue('state', responseJson.state)

                if (responseJson.profileCompleted) {
                    AsyncStorage.setItem('profileCompleted', responseJson.profileCompleted.toString());
                }
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const updateProfile = (id, data) => {
        let updatedata = { ...data, "id": parseInt(id) };
        return EditProfile(updatedata)
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
        updateProfile(userId, data)
    };

    return (
        <View style={{ flex: 1, backgroundColor:"red"}}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>

                        <TextInput
                            value={firstName}
                            style={styles.inputStyle}
                            editable={false}
                            underlineColorAndroid="#f000"
                            placeholder="First Name"
                            keyboardType={'default'}
                            placeholderTextColor="#8b9cb5"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>

                        <TextInput
                            value={lastName}
                            style={styles.inputStyle}
                            editable={false}
                            underlineColorAndroid="#f000"
                            placeholder="Last Name"
                            keyboardType={'default'}
                            placeholderTextColor="#8b9cb5"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onBlur={onBlur}
                                    value={value}
                                    style={styles.inputStyle}
                                    editable={!profileCompleted}
                                    onChangeText={value => onChange(value)}
                                    underlineColorAndroid="#f000"
                                    placeholder="Enter Phone Number"
                                    keyboardType={'phone-pad'}
                                    placeholderTextColor="#8b9cb5"
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        businessNameInputRef.current && businessNameInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            )}
                            name="phoneNumber"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.phoneNumber && <Text style={styles.ErrorMesage}>Phone Number is required!</Text>}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onBlur={onBlur}
                                    value={value}
                                    style={styles.inputStyle}
                                    editable={!profileCompleted}
                                    onChangeText={value => onChange(value)}
                                    underlineColorAndroid="#f000"
                                    placeholder="Enter Business Name"
                                    placeholderTextColor="#8b9cb5"
                                    ref={businessNameInputRef}
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        industryInputRef.current && industryInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            )}
                            name="businessName"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.businessName && <Text style={styles.ErrorMesage}>Business Name is required!</Text>}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Picker
                                    selectedValue={value}
                                    style={styles.inputStyle}
                                    ref={industryInputRef}
                                    editable={profileCompleted}
                                    onValueChange={(value, itemIndex) => onChange(value)}
                                >
                                    <Picker.Item label="-Select Industry Type-" value="" />
                                    <Picker.Item label="Cloths" value="Cloths" />
                                    <Picker.Item label="Furnitures" value="Furnitures" />
                                </Picker>
                            )}
                            name="industryType"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.industryType && <Text style={styles.ErrorMesage}>Industry Type is required!</Text>}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Picker
                                    selectedValue={value}
                                    style={styles.inputStyle}
                                    ref={countryInputRef}
                                    editable={!profileCompleted}
                                    onValueChange={(value, itemIndex) => onChange(value)}
                                >
                                    <Picker.Item label="-Select Country-" value="" />
                                    <Picker.Item label="Nigeria" value="Nigeria" />
                                    <Picker.Item label="Ghana" value="Ghana" />
                                </Picker>
                            )}
                            name="country"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.country && <Text style={styles.ErrorMesage}>Country is required!</Text>}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Picker
                                    selectedValue={value}
                                    style={styles.inputStyle}
                                    ref={stateInputRef}
                                    editable={!profileCompleted}
                                    onValueChange={(value, itemIndex) => onChange(value)}
                                >
                                    <Picker.Item label="-Select State-" value="" />
                                    <Picker.Item label="Abuja" value="Abuja" />
                                    <Picker.Item label="Lagos" value="Lagos" />
                                </Picker>
                            )}
                            name="state"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.state && <Text style={styles.ErrorMesage}>State is required!</Text>}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onBlur={onBlur}
                                    value={value}
                                    style={styles.inputStyle}
                                    onChangeText={value => onChange(value)}
                                    underlineColorAndroid="#f000"
                                    placeholder="Enter Business Address"
                                    placeholderTextColor="#8b9cb5"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                />
                            )}
                            name="businessAddress"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.businessAddress && <Text style={styles.ErrorMesage}>Business Address is required!</Text>}
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmit(handleSubmitPress)}
                    >
                        <Text style={styles.buttonTextStyle}>UPDATE</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </ScrollView>
        </View>
    )
}

export default RegistrationCompleteScreen
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
