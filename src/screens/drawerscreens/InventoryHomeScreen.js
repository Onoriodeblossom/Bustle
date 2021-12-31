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
import { InventoryHomeDashboard } from '../utility/StaticData'
import InventoryHomeComponent from '../components/InventoryHomeComponent'
import LockedComponent from '../components/LockedComponent'
import AsyncStorage from '@react-native-community/async-storage';
import { scale } from "../utility/Scalling.js";

const InventoryHomeScreen = ({ navigation }) => {
    useEffect(async () => {
        AsyncStorage.getItem('profileCompleted').then(value => {
            setProfileCompleted(JSON.parse(value))
        });
        AsyncStorage.getItem('subScriptionType').then(value => {
            setUserType(value)
        })
    }, []);
    const [userType, setUserType] = useState(0);
    const [listItems, setListItems] = useState(InventoryHomeDashboard);
    const [profileCompleted, setProfileCompleted] = useState(false);
    const { width, height } = Dimensions.get('window');
    const SalesAction = (value) => {
        switch (value) {
            case 'NewProduct':
                navigation.navigate('ProductListScreen')
                break;
            case 'Inventory':
                navigation.navigate('InventoryScreen')
                break;
            case 'Category':
                navigation.navigate('CategoryListScreen')
                break;
            case 'ShoppingList':
                navigation.navigate('ShoppingListScreen')
                break;
            case 'StockCount':
                navigation.navigate('StocksListScreen')
                break;
            case 'Reports':
                alert('Reports')
                break;
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                userType == 3 ?
                    <View style={styles.photogrid}>
                        {
                            listItems.map((val, key) => (

                                <View key={key} style={styles.imagewrap}>
                                    <InventoryHomeComponent
                                        screenWidth={width}
                                        screenHeight={height}
                                        title={val.value}
                                        imgUri={val.imgUrl}
                                        fontsize={scale(10)}
                                        IconColor={'blue'}
                                        HasAmount={'Y'}
                                        SalesAction={SalesAction}
                                        Action={val.action}
                                    />
                                </View>
                            ))
                        }

                    </View>
                    : <LockedComponent />
            }
        </SafeAreaView>
    );
};

export default InventoryHomeScreen;

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
