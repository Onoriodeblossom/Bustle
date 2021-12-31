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
  Alert,
} from 'react-native';
import Loader from './components/Loader';
import { PriceCard } from './components/PriceCard';
import PropTypes from 'prop-types';
import { ClearAppData } from './utility/Cleanups'
import AsyncStorage from '@react-native-community/async-storage';

const SubscriptionScreen = ({ route, navigation }) => {
  const [subscriptionType, setSubscriptionType] = useState('');
  console.log('route', route.params)
  const routeValue = route.params;
  const [subscriptionDuration, setSubscriptionDuration] = useState('');
  const [subscriptionPrice, setSubscriptionPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const buttonClick = (userType) => {

    setErrortext('')
    setLoading(true);
    let dataToSend = { userEmail: routeValue.LoginUserName, subscriptionPlan: userType.toString() };
    console.log('**0', dataToSend)
    // let formBody = [];
    // for (let key in dataToSend) {
    //   let encodedKey = encodeURIComponent(key);
    //   let encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');

    fetch('http://bustle.ticketplanet.ng/Subscription', {
      method: 'Post',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log('Subscriprion', responseJson);
        // If server response message same as Data Matched
        if (responseJson.responseCode === 1) {
          Alert.alert("Response", responseJson.responseText,
            [
              {
                text: "Continue",
                onPress: () => {
                  AsyncStorage.setItem('user_id', routeValue.LoginUserName);
                  AsyncStorage.setItem('id', responseJson.userId.toString());
                  AsyncStorage.setItem('businessName', responseJson.businessName);
                  AsyncStorage.setItem('subScriptionType', userType.toString());
                  AsyncStorage.setItem('profileCompleted', responseJson.profileCompleted.toString());
                  navigation.replace('DrawerNavigationRoutes')
                }
              },
              {
                text: "Logout",
                onPress: () => {
                  console.log("Cancel Pressed")
                  ClearAppData();
                  props.navigation.replace('Auth');
                },
                style: "cancel"
              }
            ]
          )
          // navigation.replace('DrawerNavigationRoutes');

          // let subscriptionType = "S";
          // let isSubscribed = 1;
          // if (isSubscribed == 1) {
          //   navigation.replace('SubscriptionScreen');
          // }
          // else {
          //   AsyncStorage.setItem('user_id', userEmail);
          //   navigation.replace('DrawerNavigationRoutes');
          // }
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
    // setTimeout(function () {
    //   navigation.replace('DrawerNavigationRoutes');
    // }, 3000)
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
        <View style={styles.MainContainer}>
          <PriceCard
            title='Freemium'
            price={'Free'}
            userType={1}
            button_title='GET STARTED'
            info={['Sales Management Only']}
            onButtonPress={buttonClick}
            titleColor='#AA00FF'
            priceColor='#000'
            iconURL='https://reactnativecode.com/wp-content/uploads/2019/02/arrow_right_icon.png'
          />
          <View style={{ height: 10 }}></View>
          {/* <PriceCard
            title='Basic'
            price={'\u20A6 5,000'}
            userType={1}
            button_title='GET STARTED'
            info={['1 Item', 'Basic Support', 'All Core Features']}
            onButtonPress={buttonClick}
            titleColor='#AA00FF'
            priceColor='#000'
            iconURL='https://reactnativecode.com/wp-content/uploads/2019/02/arrow_right_icon.png'
          />
          <View style={{ height: 10 }}></View> */}
          <PriceCard
            title='Basic User'
            price={'\u20A6 1,000'}
            userType={2}
            button_title='GET STARTED'
            info={['Sales', 'Purchases', 'Expenses', 'Reports']}
            onButtonPress={buttonClick}
            titleColor='#AA00FF'
            priceColor='#000'
            iconURL='https://reactnativecode.com/wp-content/uploads/2019/02/arrow_right_icon.png'
          />
          <View style={{ height: 10 }}></View>
          <PriceCard
            title='Professional User'
            price={'\u20A6 2,500'}
            userType={3}
            button_title='GET STARTED'
            info={['All Basic Features', 'Inventory']}
            onButtonPress={buttonClick}
            titleColor='#AA00FF'
            priceColor='#000'
            iconURL='https://reactnativecode.com/wp-content/uploads/2019/02/arrow_right_icon.png'
          />
        </View>
        {/* <PricingCard
          color="#4f9deb"
          title="Free"
          price="N0"
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{title: 'BUY NOW', icon: 'flight-takeoff'}}
        />
        <PricingCard
          color="#4f9deb"
          title="Standard"
          price="N2000"
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{title: 'BUY NOW', icon: 'flight-takeoff'}}
        />
        <PricingCard
          color="#4f9deb"
          title="Super Standard"
          price="N3000"
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{title: 'BUY NOW', icon: 'flight-takeoff'}}
        /> */}
      </ScrollView>
    </View>
  );
};

export default SubscriptionScreen;
PriceCard.propTypes =
{
  title: PropTypes.string,
  price: PropTypes.string,
  titleColor: PropTypes.string,
  priceColor: PropTypes.string,
  info: PropTypes.arrayOf(PropTypes.string),
  button_title: PropTypes.string,
  onButtonPress: PropTypes.func,
  iconURL: PropTypes.string
}
PriceCard.defaultProps =
{
  title: "Default",
  price: "Default",
  titleColor: "#00E676",
  priceColor: "#00E676",
  info: [],
  button_title: "GET STARTED"
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 15,
    alignItems: 'center',
    justifyContent: 'center',
  }
});