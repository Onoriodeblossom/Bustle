import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    Picker,
    Alert
} from 'react-native';
import Loader from './components/Loader';
import { useForm, Controller } from "react-hook-form";


const ForgetPasswordScreen = props => {
    const [userEmail, setUserEmail] = useState('');
    const [emailResponse, setEmailResponse] = useState({});
    const [activationCode, setActivationCode] = useState('');
    const [buttonText, setButtonText] = useState('SEND CODE');
    const [displayPassword, setDisplayPassword] = useState('');
    const [displayActivationCode, setDisplayActivationCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [disableValidateCode, setDisableValidateCode] = useState(true);
    const [errortext, setErrortext] = useState('');
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);
    const { control, handleSubmit, setError, setValue, formState: { errors, isDirty, isValid }, watch } = useForm();
    const onChangeFirst = value => console.log('First:', value)

    const emailInputRef = createRef();
    const activationCodeInputRef = createRef();

    const ValidateCode = () => {
        setErrortext('');

        setLoading(true);

        fetch(`http://bustle.ticketplanet.ng/ValidateActivationCode/${userEmail}/${activationCode}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 100) {
                    setDisplayPassword(true);
                } else {
                    setDisplayPassword(false);
                }
            })
            .catch(error => {
                setLoading(false);
            });
    }


    const sendCode = () => {
        setErrortext('');
        setLoading(true);
        setDisplayPassword(false)
        setValue('activationCode', '')
        setValue('userConfirmPassword', '')
        setValue('userPassword', '')
        let data = {
            emailAddress: userEmail
        }
        fetch(`http://bustle.ticketplanet.ng/CreateActivationCode`, {
            method: 'Post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    setDisplayPassword(true);
                    setButtonText('RESEND CODE')
                    Alert.alert('Information', responseJson.responseText)
                } else {
                    setDisplayPassword(false);
                }
            })
            .catch(error => {
                setLoading(false);
            });
    }
    const handleSubmitButton = (data) => {
        setErrortext('');
        setLoading(true);
        console.log('**', data)
        fetch('http://bustle.ticketplanet.ng/ChangePassword', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setLoading(false);
                console.log(responseJson);
                if (responseJson.responseCode == 0) {
                    setChangePasswordSuccess(true);
                } else {
                    setErrortext(responseJson.responseText);
                    Alert.alert('Information', responseJson.responseText)
                    setChangePasswordSuccess(false);
                }
            })
            .catch(error => {
                setLoading(false);
                console.error(error);
            });
    };
    if (changePasswordSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../images/success.png')}
                    style={{
                        height: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                    }}
                />
                <Text style={styles.successTextStyle}>Change Password Successful</Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.buttonTextStyle}>Go to Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../images/aboutreact.png')}
                        style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 30,
                        }}
                    />
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onBlur={onBlur}
                                    value={value}
                                    style={styles.inputStyle}
                                    onChangeText={value => {
                                        onChange(value)
                                        setUserEmail(value)
                                        setDisplayPassword(false)
                                        setButtonText('SEND CODE')
                                    }}
                                    underlineColorAndroid="#f000"
                                    placeholder="Enter Email"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="email-address"
                                    ref={emailInputRef}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                />
                            )}
                            name="userEmail"
                            rules={{
                                required: true,
                                //validate: (value) => emailExist(value),
                                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
                            }}
                            defaultValue=""
                        />

                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.userEmail?.type === 'manual' && <Text style={styles.ErrorMesage}>{errors.userEmail.message}</Text>}
                        {errors.userEmail?.type === 'required' && <Text style={styles.ErrorMesage}>Email is required!</Text>}
                        {errors.userEmail?.type === 'pattern' && <Text style={styles.ErrorMesage}>Invalid email address</Text>}
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={sendCode}>
                        <Text style={styles.buttonTextStyle}>{buttonText}</Text>
                    </TouchableOpacity>
                    {
                        displayPassword ?
                            <View>
                                <View style={styles.SectionStyle}>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                onBlur={onBlur}
                                                value={value}
                                                style={styles.inputStyle}
                                                onChangeText={value => {
                                                    onChange(value)
                                                    if (value.length < 4) {
                                                        setDisableValidateCode(true)
                                                    } else {
                                                        setDisableValidateCode(false)
                                                    }

                                                }}
                                                underlineColorAndroid="#f000"
                                                placeholder="Enter ActivationCode"
                                                keyboardType={'numeric'}
                                                placeholderTextColor="#8b9cb5"
                                                returnKeyType="next"
                                                blurOnSubmit={false}
                                                maxLength={6}
                                            />
                                        )}
                                        name="activationCode"
                                        rules={{
                                            required: true,
                                            //validate: (value) => ValidateActivationCode(value),
                                        }}
                                        defaultValue=""
                                    />
                                </View>
                                <View style={styles.ErrorSectionStyle}>
                                    {errors.activationCode && <Text style={styles.ErrorMesage}>Activation Code is required!</Text>}
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
                                                placeholder="Enter Password"
                                                placeholderTextColor="#8b9cb5"
                                                returnKeyType="next"
                                                secureTextEntry={true}
                                                blurOnSubmit={false}
                                            />
                                        )}
                                        name="userPassword"
                                        rules={{ required: true, minLength: 6 }}
                                        defaultValue=""
                                    />
                                </View>
                                <View style={styles.ErrorSectionStyle}>
                                    {errors.userPassword && <Text style={styles.ErrorMesage}>Password is required!</Text>}
                                    {errors.userPassword && errors.userPassword.type === "minLength" && <Text style={styles.ErrorMesage}>Your paassword must be at least 6 characters</Text>}
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
                                                placeholder="Confirm Password"
                                                placeholderTextColor="#8b9cb5"
                                                autoCapitalize="sentences"
                                                secureTextEntry={true}
                                                returnKeyType="next"
                                                onSubmitEditing={Keyboard.dismiss}
                                                blurOnSubmit={false}
                                            />
                                        )}
                                        name="userConfirmPassword"
                                        rules={{
                                            required: true,
                                            validate: (value) => value === watch('userPassword') || "Password fields don't match"
                                            // value is from confirm and watch will return value from password
                                            //value === getValues('password') || <span>Password fields don't match</span>
                                        }}
                                        defaultValue=""
                                    />
                                </View>
                                <View style={styles.ErrorSectionStyle}>
                                    {errors.userConfirmPassword?.type === 'validate' && <Text style={styles.ErrorMesage}>{errors.userConfirmPassword.message}</Text>}
                                    {errors.userConfirmPassword?.type === 'required' && <Text style={styles.ErrorMesage}>Confirm password required</Text>}
                                </View>
                            </View>
                            : null
                    }
                    {
                        displayPassword ?
                            // {errortext != '' ? (
                            //     <Text style={styles.errorTextStyle}>{errortext}</Text>
                            // ) : null}
                            <TouchableOpacity

                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                disabled={disableValidateCode}
                                onPress={handleSubmit(handleSubmitButton)}>

                                <Text style={styles.buttonTextStyle}>CHANGE PASSWORD</Text>
                            </TouchableOpacity> : null
                    }
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default ForgetPasswordScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
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
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
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
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});
