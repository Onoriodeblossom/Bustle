import React, { Component, useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { HomeDashboard } from '../utility/StaticData'
import HeaderComponent from '../components/DashBoardHeaderComponent'
import BarChartComponent from '../components/DashBoardBarchartComponent'
import SalesDetailsComponent from '../components/DashBoardDetailsComponent'
import PurchaseDetailsComponent from '../components/PurchaseDetailsComponent'
import ExpenseDetailsComponent from '../components/ExpenseDetailsComponent'
import ExpenseProfitComponent from '../components/ExpenseProfitComponent'
import WeeklyPercentDetailsComponent from '../components/WeeklyPercentDetailsComponent'
import HomeComponents from '../components/HomeComponents'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';




const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [dashboardList, setDashboardList] = useState([]);
  const [userId, setUserId] = useState(0);
  const [userType, setUserType] = useState(0);
  useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('subScriptionType').then(value => {
        setUserType(value)
      })
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
            setDashboardList(responseJson)
          }).catch(error => {
            setLoading(false);
            console.error(error);
          });
      });

    })
    return () => {
      setDashboardList([])
      unsubscribe
    }

  }, [navigation]);

  const [listItems, setListItems] = useState(HomeDashboard);
  const { width, height } = Dimensions.get('window');

  return (
    <SafeAreaView style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
      <Loader loading={loading} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        {
          dashboardList !== undefined ?
            <HeaderComponent item={dashboardList.dashboardsalesheader} />
            : null
        }

        {dashboardList !== undefined ?
          <BarChartComponent item={dashboardList.dashboardsalesbarchart} />
          : null
        }
        {dashboardList !== undefined ?
          <SalesDetailsComponent item={dashboardList.dashBoardSalesProfit} />
          : null
        }

        {
          userType == 3 ?
            dashboardList !== undefined ?
              <ScrollView horizontal={true}>
                <WeeklyPercentDetailsComponent item={dashboardList.dashBoardSalesWeeklyGraph} />
              </ScrollView>
              : null
            : null
        }

        {dashboardList !== undefined ?
          <PurchaseDetailsComponent item={dashboardList.dashBoardProfitExpense} />
          : null
        }
        {dashboardList !== undefined ?
          <ExpenseDetailsComponent item={dashboardList.dashBoardProfitExpense} />
          : null
        }
        {dashboardList !== undefined ?
          <ExpenseProfitComponent item={dashboardList.dashBoardExpense} />
          : null
        }


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
    width: (Dimensions.get('window').width / 2) - 2
  }
});
