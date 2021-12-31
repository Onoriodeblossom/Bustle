import React, { Component, useState, useEffect } from 'react'
import { SafeAreaView, Text, View, StyleSheet, Platform, TouchableOpacity, LayoutAnimation, UIManager, SectionList, ScrollView } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { ProductData, InvoiceData } from '../utility/StaticData'
import { SearchBar, CheckBox, Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';
import { ExpandableInvoiceList } from '../components/ExpandableInvoiceList';
import AsyncStorage from '@react-native-community/async-storage';

const InvoiceScreen = ({ navigation }) => {

    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('id').then(value => {
                setLoading(true);
                fetch(`http://bustle.ticketplanet.ng/GetSalesHistoryDays/${value}`, {
                    method: 'Get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(responseJson => {
                        setLoading(false);
                        setListDataSource(responseJson)
                    }).catch(error => {
                        setLoading(false);
                        console.error(error);
                    });
            });
        })
        return () => {
            setDiscountList([])
            unsubscribe
        }
    }, [navigation]);

    const [listDataSource, setListDataSource] = useState([]);
    const [multiSelect, setMultiSelect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [variationDetails, setVariationDetails] = useState({});

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...listDataSource];
        if (multiSelect) {
            // If multiple select is enabled
            array[index]['isExpanded'] = !array[index]['isExpanded'];
        } else {
            // If single select is enabled
            array.map((value, placeindex) =>
                placeindex === index
                    ? (array[placeindex]['isExpanded'] =
                        !array[placeindex]['isExpanded'])
                    : (array[placeindex]['isExpanded'] = false),
            );
        }
        setListDataSource(array);
    };

    const UpdateStatus = (Id) => {
        navigation.navigate('UpdateSalesDetailsScreen', { id: Id, source: 'Invoice' })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Loader loading={loading} />

                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={styles.titleText}>Invoice
                    <Text style={{ fontStyle: 'italic', fontSize: 8 }}>(Click on items to view details)</Text></Text>

                </View>
                <ScrollView>
                    {listDataSource.map((item, key) => (
                        <ExpandableInvoiceList
                            key={item.dateDescription}
                            onClickFunction={() => {
                                updateLayout(key);
                            }}
                            onEditFunction={UpdateStatus}
                            item={item}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default InvoiceScreen

const styles = StyleSheet.create({
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
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
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#F5FCFF',
    },
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    item: {
        paddingLeft: 20,
        paddingTop: 10,
        fontSize: 18
    },
    smallitem: {
        paddingLeft: 20,
        paddingTop: 5,
        fontSize: 10
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
    sectionHeaderStyle: {
        backgroundColor: '#307ecc',
        fontSize: 20,
        padding: 5,
        color: '#fff',
    }
});
