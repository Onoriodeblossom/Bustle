import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './components/Loader';
import {ClearAppData} from './utility/Cleanups';
import {useForm, Controller} from 'react-hook-form';
import {Container} from './components/container';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const passwordInputRef = createRef();

  const handleSubmitPress = data => {
    setErrortext('');
    setLoading(true);
    //let dataToSend = data;
    //let formBody = [];
    ClearAppData();
    // console.log(responseJson.data.email);

    // for (let key in dataToSend) {
    //   let encodedKey = encodeURIComponent(key);
    //   let encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');
    // console.log('form body', formBody)
    fetch('http://bustle.ticketplanet.ng/AutheticateUser', {
      method: 'Post',
      body: JSON.stringify(data),
      headers: {
        //Header Defination
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        // If server response message same as Data Matched
        if (responseJson.responseCode == 0) {
          let isSubscribed = responseJson.isSubscribed;
          if (isSubscribed !== true) {
            navigation.replace('SubscriptionScreen', {
              LoginUserName: data.userEmail,
            });
          } else {
            AsyncStorage.setItem('user_id', userEmail);
            AsyncStorage.setItem('id', responseJson.userId.toString());
            AsyncStorage.setItem('businessName', responseJson.businessName);
            AsyncStorage.setItem(
              'subScriptionType',
              responseJson.subscriptionPlan,
            );
            AsyncStorage.setItem(
              'profileCompleted',
              responseJson.profileCompleted.toString(),
            );
            navigation.replace('DrawerNavigationRoutes');
          }
        } else {
          setErrortext(responseJson.responseText);
          console.log('Please check your email id or password');
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <Container></Container>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={styles.polygon}>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}></View>
            <View style={styles.SectionStyle}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    onBlur={onBlur}
                    value={value}
                    style={styles.inputStyle}
                    onChangeText={value => onChange(value)}
                    placeholder="Enter Email" //dummy@abc.com
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      passwordInputRef.current &&
                      passwordInputRef.current.focus()
                    }
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                )}
                name="userEmail"
                rules={{
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
                }}
                defaultValue=""
              />
            </View>
            <View style={styles.ErrorSectionStyle}>
              {errors.userEmail && (
                <Text style={styles.ErrorMesage}>Email is required!</Text>
              )}
            </View>
            <View style={styles.SectionStyle}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    value={value}
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    placeholder="Enter Password" //12345
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    ref={passwordInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                  />
                )}
                name="userPassword"
                rules={{required: true}}
                defaultValue=""
              />
            </View>
            <View style={styles.ErrorSectionStyle}>
              {errors.userPassword?.type === 'required' && (
                <Text style={styles.ErrorMesage}>Password is required!</Text>
              )}
            </View>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('ForgetPasswordScreen')}>
              Forgot password?
            </Text>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmit(handleSubmitPress)}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  polygon: {
    backgroundColor: 'red',

    // clipPath: "polygon(0 0, 100% 46%, 100% 100%, 0 100%, 0 49%)",
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  ErrorSectionStyle: {
    marginLeft: 35,
    marginRight: 35,
  },
  ErrorMesage: {
    fontSize: 9,
    color: 'red',
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
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
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
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
