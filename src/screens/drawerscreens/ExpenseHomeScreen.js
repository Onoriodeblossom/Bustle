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
import { ExpenseHomeDashboard, ExpenseHomeDashboardUserType } from '../utility/StaticData'
import ExpenseHomeComponent from '../components/ExpenseHomeComponent'
import AsyncStorage from '@react-native-community/async-storage';
import { scale } from "../utility/Scalling.js";
import LockedComponent from '../components/LockedComponent'

const ExpenseHomeScreen = ({ navigation }) => {
    useEffect(async () => {
        AsyncStorage.getItem('profileCompleted').then(value => {
            setProfileCompleted(JSON.parse(value))

        });
        AsyncStorage.getItem('subScriptionType').then(value => {
            setUserType(value)
        })
    }, []);
    const [profileCompleted, setProfileCompleted] = useState(false);
    const [listItems, setListItems] = useState(ExpenseHomeDashboard);
    const [usertypePurchase, setUsertypePurchase] = useState(ExpenseHomeDashboardUserType);
    const [userType, setUserType] = useState(0);
    const { width, height } = Dimensions.get('window');
    const SalesAction = (value) => {
        // if (!profileCompleted) {
        //     Alert.alert("Warning", 'Kindly complete your registration to continue.',
        //         [
        //             {
        //                 text: "Yes",
        //                 onPress: () => {
        //                     navigation.push('RegistrationCompleteScreen')
        //                 }
        //             },
        //             {
        //                 text: "No",
        //                 onPress: () => {
        //                     console.log("Cancel Delete")
        //                 },
        //                 style: "cancel"
        //             }
        //         ]
        //     )
        //     return;
        // }

        switch (value) {
            case 'ne':
                navigation.navigate('ExpenseListScreen')
                break;
            case 'ne2':
                navigation.navigate('ExpenseType2ListScreen')
                break;
            case 'rpe':
                navigation.navigate('AddPreviousExpenseScreen')
                break;
            case 'eh':
                navigation.navigate('ExpenseHistoryScreen')
                break;
            case 'et':
                navigation.navigate('ExpenseTypeListScreen')
                break;
        }
    }
    const menu1 = () => {
        return usertypePurchase.map((val, key) => (
            <View key={key} style={styles.imagewrap}>
                <ExpenseHomeComponent
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
    const menu2 = () => {
        return listItems.map((val, key) => (
            <View key={key} style={styles.imagewrap}>
                <ExpenseHomeComponent
                    screenWidth={width}
                    screenHeight={height}
                    title={val.value}
                    imgUri={val.imgUrl}
                    IconColor={'blue'}
                    fontsize={scale(10)}
                    HasAmount={'Y'}
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
                        userType == 2 ?
                            menu1() :
                            menu2()
                    }

                </View> : <LockedComponent />
            }
        </SafeAreaView>
    );
};

export default ExpenseHomeScreen;

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
