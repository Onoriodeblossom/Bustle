import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {SalesHomeDashboard} from '../utility/StaticData';
import SalesHomeComponent from '../components/SalesHomeComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {scale} from '../utility/Scalling.js';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import {Container} from '../components/container';

const SalesHomeScreen = ({navigation}) => {
  useEffect(async () => {
    AsyncStorage.getItem('profileCompleted').then(value => {
      setProfileCompleted(JSON.parse(value));
    });

    AsyncStorage.getItem('subScriptionType').then(value => {
      setUserType(value);
    });
    return () => {
      setProfileCompleted(false);
      setUserType(0);
      unsubscribe;
    };
  }, []);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [listItems, setListItems] = useState(SalesHomeDashboard);
  const [userType, setUserType] = useState(0);
  const {width, height} = Dimensions.get('window');
  const SalesAction = value => {
    // if (!profileCompleted) {
    //     Alert.alert('Warning', 'Kindly complete your registration')
    //     return;
    // }

    switch (value) {
      case 'ns':
        if (userType == 1 || userType == 2)
          navigation.navigate('AddSalesUserType1');
        else if (userType == 3) navigation.navigate('AddSalesUserType2');
        break;
      case 'su':
        navigation.navigate('SalesUpdateScreen');
        break;
      case 'di':
        navigation.navigate('DiscountListScreen');
        break;
      case 'si':
        navigation.navigate('InvoiceScreen');
        break;
      case 'tc':
        navigation.navigate('TrackCreditScreen');
        break;
      case 'sh':
        navigation.navigate('SalesHistoryScreen');
        break;
      case 'rs':
        navigation.navigate('AddPreviousSaleScreen');
        break;
    }
  };
  return (
    <ScrollView style={{flex: 1}}>
      {/* <Container scrollable> */}
        <View style={styles.photogrid}>
          {listItems.map((val, key) => (
            <>
              <SalesHomeComponent
                screenWidth={width}
                screenHeight={height}
                title={val.value}
                imgUri={val.imgUrl}
                IconColor={'blue'}
                HasAmount={'Y'}
                leftIconName={val.leftIconName}
                rightIconName={val.rightIconName}
                fontsize={scale(10)}
                SalesAction={SalesAction}
                Action={val.action}
              />
              <View style={styles.spacer} />
            </>
          ))}
        </View>
      {/* </Container> */}
    </ScrollView>
  );
};

export default SalesHomeScreen;

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 66,
    marginTop: 16,
  },
  photogrid: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  spacer: {
    paddingVertical: 20,
  },
});
