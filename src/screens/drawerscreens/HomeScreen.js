import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {HomeDashboard} from '../utility/StaticData';
import HeaderComponent from '../components/DashBoardHeaderComponent';
import BarChartComponent from '../components/DashBoardBarchartComponent';
import SalesDetailsComponent from '../components/DashBoardDetailsComponent';
import PurchaseDetailsComponent from '../components/PurchaseDetailsComponent';
import ExpenseDetailsComponent from '../components/ExpenseDetailsComponent';
import ExpenseProfitComponent from '../components/ExpenseProfitComponent';
import WeeklyPercentDetailsComponent from '../components/WeeklyPercentDetailsComponent';
import HomeComponents from '../components/HomeComponents';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';

import {DashBoardCard} from '../components/DashBoardCard/dashBoardCard.componet';
import { ExpandableSalesHistoryList } from '../components/ExpandableSalesHistoryList';
import ExpenseHistoryScreen from './ExpenseHistoryScreen';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [dashboardList, setDashboardList] = useState([]);
  const [userId, setUserId] = useState(0);
  const [userType, setUserType] = useState(0);
  useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('subScriptionType').then(value => {
        setUserType(value);
      });
      AsyncStorage.getItem('id').then(value => {
        setLoading(true);
        fetch(`http://bustle.ticketplanet.ng/GetDashboard/${value}`, {
          method: 'Get',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(responseJson => {
            setLoading(false);
            setDashboardList(responseJson);
          })
          .catch(error => {
            setLoading(false);
            console.error(error);
          });
      });
    });
    return () => {
      setDashboardList([]);
      unsubscribe;
    };
  }, [navigation]);

  const [listItems, setListItems] = useState(HomeDashboard);
  const {width, height} = Dimensions.get('window');

  return (
    <SafeAreaView style={{flex: 1, paddingTop:5,paddingHorizontal:20}}>
      <Loader loading={loading} />
      <Text> Name</Text>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <BarChartComponent item={dashboardList.dashboardsalesbarchart} />
        {/* <View style={{backgroundColor:"yellow",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around"  }}> */}

        <SalesDetailsComponent item={dashboardList.dashBoardSalesProfit} />

        <View style={styles.cardContainer}>

        <PurchaseDetailsComponent item={dashboardList.dashBoardProfitExpense} />

        <DashBoardCard style={{flexDirection: 'row'}}>
          <View style={{}}>
            <Text style={{color: 'red', fontSize: 15,width:100}}>Weekly Expenses</Text>
          </View>
          <View style={{
            height: 80,
            justifyContent: 'center',
            }}>
            {dashboardList.dashBoardProfitExpense === undefined ? null : (
              <Text style={{color: 'red', fontSize:40 }}>
                {'\u20A6'}
                {dashboardList.dashBoardProfitExpense.expenseAmount}
              </Text>
            )}
          </View>
        </DashBoardCard>
        <DashBoardCard >
          <View style={{flexDirection: 'column', marginTop: 10  }}>
            <Text style={{color: '#0F9D58'}}>Total Expenditure</Text>
          </View>
          <View style={{
            height: 80,
            justifyContent: 'center',}}>
            {dashboardList.dashBoardProfitExpense === undefined ? null : (
              <Text style={{color: '#0F9D58', fontSize: 40}}>
                {'\u20A6'}
                {dashboardList.dashBoardProfitExpense.expenditure}
              </Text>
            )}
          </View>
        </DashBoardCard>
        <ExpenseProfitComponent 
        item={dashboardList.dashBoardExpense} 
        />
        </View>



        {/* </View> */}
        <ScrollView horizontal={true}>
          <WeeklyPercentDetailsComponent
            item={dashboardList.dashBoardSalesWeeklyGraph}
          />

          {/* <ExpandableSalesHistoryList/> */}
        

        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
  photogrid: {
    flex: 1,
    padding: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imagewrap: {
    padding: 2,
    height: 200,
    // width: Dimensions.get('window').width / 2 - 2,
  },
  cardContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    flexWrap:"wrap",
    width:"100%",
    // backgroundColor:"blue"
  }
});
