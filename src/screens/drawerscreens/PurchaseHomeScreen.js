import React, { Component, useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Dimensions, StyleSheet, Alert } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { PurchaseHomeDashboard, PurchaseHomeDashboardUserType } from '../utility/StaticData'
import PurchaseHomeComponent from '../components/PurchaseHomeComponent'
import AsyncStorage from '@react-native-community/async-storage';
import { scale } from "../utility/Scalling.js";
import LockedComponent from '../components/LockedComponent'

const PurchaseHomeScreen = ({ navigation }) => {
    useEffect(async () => {
        AsyncStorage.getItem('profileCompleted').then(value => {
            setProfileCompleted(JSON.parse(value))
        });
        AsyncStorage.getItem('subScriptionType').then(value => {
            setUserType(value)
        })
    }, []);

    const [listItems, setListItems] = useState(PurchaseHomeDashboard);
    const [profileCompleted, setProfileCompleted] = useState(false);
    const [usertypePurchase, setUsertypePurchase] = useState(PurchaseHomeDashboardUserType);
    const [userType, setUserType] = useState(0);
    const { width, height } = Dimensions.get('window');
    const SalesAction = (value) => {
        // if (!profileCompleted) {
        //     Alert.alert('Warning', 'Kindly complete your registration')
        //     return;
        // }
        switch (value) {
            case 'np':
                navigation.navigate('PurchaseScreen')
                break;
            case 'ph':
                navigation.navigate('PurchaseHistoryScreen')
                break;
            case 'rpp':
                navigation.navigate('AddPreviousPurchaseScreen')
                break;
            case 'sl':
                navigation.navigate('ShoppingListHomeScreen')
                break;
        }
    }
    const menuBasic = () => {
        return listItems.map((val, key) => (
            <View key={key} style={styles.imagewrap}>
                <PurchaseHomeComponent
                    screenWidth={width}
                    screenHeight={height}
                    title={val.value}
                    imgUri={val.imgUrl}
                    IconColor={'blue'}
                    HasAmount={'Y'}
                    fontsize={scale(10)}
                    SalesAction={SalesAction}
                    Action={val.action}
                />
            </View>
        ))
    }
    const menuProfessional = () => {
        return usertypePurchase.map((val, key) => (
            <View key={key} style={styles.imagewrap}>
                <PurchaseHomeComponent
                    screenWidth={width}
                    screenHeight={height}
                    title={val.value}
                    imgUri={val.imgUrl}
                    IconColor={'blue'}
                    HasAmount={'Y'}
                    fontsize={scale(10)}
                    SalesAction={SalesAction}
                    Action={val.action}
                />
            </View>
        ))
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>

            {userType == 2 || userType == 3 ?
                <View style={styles.photogrid}>
                    {
                        userType == 3 ?
                            menuProfessional() :
                            menuBasic()

                    }

                </View>
                : <LockedComponent />
            }
        </SafeAreaView>
    );
};

export default PurchaseHomeScreen;

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
        height: scale(180),
        width: scale(170)
    }
});
