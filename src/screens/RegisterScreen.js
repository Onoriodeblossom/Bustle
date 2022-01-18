import React, {useState, createRef} from 'react';
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
  ImageBackground,
} from 'react-native';
import Loader from './components/Loader';
import {useForm, Controller} from 'react-hook-form';
import {Container} from './components/container';
import Rectangle from '../images/rectangle2.png';
import Icon from 'react-native-vector-icons/AntDesign';

import Logo from '../images/logo.png';

const RegisterScreen = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isDirty, isValid},
    watch,
  } = useForm();
  const onChangeFirst = value => console.log('First:', value);

  //const { isDirty, isValid } = control.readFormStateRef.current;

  console.log('form', isDirty, isValid);
  const firstNameInputRef = createRef();
  const lastNameInputRef = createRef();
  const phoneNumberInputRef = createRef();
  const countryInputRef = createRef();
  const stateInputRef = createRef();
  const businessNameInputRef = createRef();
  const industryInputRef = createRef();
  const emailInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPasswordInputRef = createRef();

  const handleSubmitButton = data => {
    setErrortext('');

    console.log('register', data);
    //Show Loader
    setLoading(true);
    //var dataToSend = data;
    // {
    //   firstName: firstName,
    //   lastName: lastName,
    //   phoneNumber: phoneNumber,
    //   industryType: industryType,
    //   businessName: businessName,
    //   state: state,
    //   country: country,
    //   emailAddress: userEmail,
    //   address: userAddress,
    //   userPassword: userPassword
    // };
    // var formBody = [];
    // for (var key in dataToSend) {
    //   var encodedKey = encodeURIComponent(key);
    //   var encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');

    fetch('http://bustle.ticketplanet.ng/CreateOrEditUsers', {
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
          setIsRegistraionSuccess(true);
          console.log('Registration Successful. Please Login to proceed');
        } else {
          setErrortext(responseJson.responseText);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };
  if (isRegistraionSuccess) {
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
        <Text style={styles.successTextStyle}>Registration Successful</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const emailIsUnique = async userEmail => {
    console.log('confirm', userEmail);
    var emailexist = false;
    await fetch(`http://bustle.ticketplanet.ng/CheckEmail/${userEmail}`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.responseCode == 0) {
          emailexist = true;
        } else {
          emailexist = false;
        }
      })
      .catch(error => {
        console.error(error);
      });
    console.log('Exist', emailexist);
    return emailexist;
  };
  return (
    <Container scrollable>
      <ScrollView style={{width: '100%'}}>
        <View
          keyboardShouldPersistTaps="handled"
          style={{
            height: 890,
            marginBottom: 50,
            width: '100%',
          }}>
          <ImageBackground
            source={Rectangle}
            resizeMode="contain"
            style={{height: 890, width: 385}}>
            <Loader loading={loading} />
            <View style={{alignItems: 'center'}}>
              <Image
                source={Logo}
                style={{
                  width: 330,
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <Text style={{fontSize: 30, paddingTop: 90, paddingLeft: 65}}>
              Sign up
            </Text>
            <View
              style={{
                paddingTop: 80,
              }}>
              <KeyboardAvoidingView enabled>
                <View style={styles.SectionStyle}>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        onBlur={onBlur}
                        value={value}
                        style={styles.inputStyle}
                        onChangeText={value => onChange(value)}
                        underlineColorAndroid="#f000"
                        placeholder=" Firstname"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                          lastNameInputRef.current &&
                          lastNameInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                      />
                    )}
                    name="firstName"
                    rules={{required: true}}
                    defaultValue=""
                  />
                </View>
                <View style={styles.ErrorSectionStyle}>
                  {errors.firstName && (
                    <Text style={styles.ErrorMesage}>
                      FirstName is required!
                    </Text>
                  )}
                </View>
                <View style={styles.SectionStyle}>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        onBlur={onBlur}
                        value={value}
                        style={styles.inputStyle}
                        onChangeText={value => onChange(value)}
                        underlineColorAndroid="#f000"
                        placeholder="Enter Last Name"
                        placeholderTextColor="#8b9cb5"
                        ref={lastNameInputRef}
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                          emailInputRef.current && emailInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                      />
                    )}
                    name="lastName"
                    rules={{required: true}}
                    defaultValue=""
                  />
                </View>
                <View style={styles.ErrorSectionStyle}>
                  {errors.lastName && (
                    <Text style={styles.ErrorMesage}>
                      LastName is required!
                    </Text>
                  )}
                </View>
                <View style={styles.SectionStyle}>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        onBlur={onBlur}
                        value={value}
                        style={styles.inputStyle}
                        onChangeText={value => onChange(value)}
                        underlineColorAndroid="#f000"
                        placeholder="Email"
                        placeholderTextColor="#8b9cb5"
                        keyboardType="email-address"
                        ref={emailInputRef}
                        returnKeyType="next"
                        onSubmitEditing={() =>
                          phoneNumberInputRef.current &&
                          phoneNumberInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                      />
                    )}
                    name="userEmail"
                    rules={{
                      required: true,
                      validate: value => emailIsUnique(value),
                      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
                    }}
                    defaultValue=""
                  />
                </View>
                <View style={styles.ErrorSectionStyle}>
                  {errors.userEmail?.type === 'manual' && (
                    <Text style={styles.ErrorMesage}>
                      {errors.userEmail.message}
                    </Text>
                  )}
                  {errors.userEmail?.type === 'required' && (
                    <Text style={styles.ErrorMesage}>Email is required!</Text>
                  )}
                  {errors.userEmail?.type === 'pattern' && (
                    <Text style={styles.ErrorMesage}>
                      Invalid email address
                    </Text>
                  )}
                  {errors.userEmail &&
                    errors.userEmail?.type === 'validate' && (
                      <Text style={styles.ErrorMesage}>
                        This email address already exists
                      </Text>
                    )}
                </View>

                <View style={styles.SectionStyle}>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        onBlur={onBlur}
                        value={value}
                        style={styles.inputStyle}
                        onChangeText={value => onChange(value)}
                        underlineColorAndroid="#f000"
                        placeholder="Password"
                        placeholderTextColor="#8b9cb5"
                        ref={passwordInputRef}
                        returnKeyType="next"
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                          confirmPasswordInputRef.current &&
                          confirmPasswordInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                      />
                    )}
                    name="userPassword"
                    rules={{required: true, minLength: 6}}
                    defaultValue=""
                  />
                </View>
                <View style={styles.ErrorSectionStyle}>
                  {errors.userPassword && (
                    <Text style={styles.ErrorMesage}>
                      Password is required!
                    </Text>
                  )}
                  {errors.userPassword &&
                    errors.userPassword.type === 'minLength' && (
                      <Text style={styles.ErrorMesage}>
                        Your paassword must be at least 6 characters
                      </Text>
                    )}
                </View>
                <View style={styles.SectionStyle}>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        onBlur={onBlur}
                        value={value}
                        style={styles.inputStyle}
                        onChangeText={value => onChange(value)}
                        underlineColorAndroid="#f000"
                        placeholder="Confirm Password"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        ref={confirmPasswordInputRef}
                        secureTextEntry={true}
                        returnKeyType="next"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                      />
                    )}
                    name="userConfirmPassword"
                    rules={{
                      required: true,
                      validate: value =>
                        value === watch('userPassword') ||
                        "Password fields don't match",
                      // value is from confirm and watch will return value from password
                      //value === getValues('password') || <span>Password fields don't match</span>
                    }}
                    defaultValue=""
                  />
                </View>
                <View style={styles.ErrorSectionStyle}>
                  {errors.userConfirmPassword?.type === 'validate' && (
                    <Text style={styles.ErrorMesage}>
                      {errors.userConfirmPassword.message}
                    </Text>
                  )}
                  {errors.userConfirmPassword?.type === 'required' && (
                    <Text style={styles.ErrorMesage}>
                      Confirm password required
                    </Text>
                  )}
                </View>
                {errortext != '' ? (
                  <Text style={styles.errorTextStyle}>{errortext}</Text>
                ) : null}
              </KeyboardAvoidingView>
            </View>
          </ImageBackground>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmit(handleSubmitButton)}>
            <Icon name="arrowright" color="#fff" size={21} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};
export default RegisterScreen;

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
    backgroundColor: '#0292B7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 70,
    width: 70,
    alignItems: 'center',
    borderRadius: 50,
    // marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    position: 'absolute',
    top: 720,
    left: 160,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  ErrorSectionStyle: {
    marginLeft: 35,
    marginRight: 35,
  },
  ErrorMesage: {
    fontSize: 9,
    color: 'red',
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 0,
    borderBottomWidth: 1,
    // backgroundColor:"red",
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
