import React, { Component, useState, useEffect } from 'react'
import { SafeAreaView, Text, View, StyleSheet, Platform, FlatList, LayoutAnimation, UIManager, SectionList, ScrollView } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { ProductData, InvoiceData } from '../utility/StaticData'
import { SearchBar, CheckBox, Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';
import { ExpandableExpenseHistoryList } from '../components/ExpandableExpenseHistoryList';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import moment from 'moment'

const ExpenseHistoryScreen = ({ navigation }) => {
    useEffect(async () => {
        AsyncStorage.getItem('id').then(value => {

            setUserId(value)

            var currentDate = moment(date).format('YYYY-MM-DD')
            GetExpenseHistory(value, currentDate)
        });
    }, []);

    const GetExpenseHistory = (value, dateValue) => {
        setLoading(true);
        fetch(`http://bustle.ticketplanet.ng/GetExpenseHistoryWeek/${value}/${dateValue}`, {
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
    }
    const [listDataSource, setListDataSource] = useState([]);
    const [multiSelect, setMultiSelect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [variationDetails, setVariationDetails] = useState({});
    const [date, setDate] = useState(moment().toDate())
    const [userId, setUserId] = useState(0)

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
            array.map((value, placeindex) => placeindex === index
                ? (array[placeindex]['isExpanded'] =
                    !array[placeindex]['isExpanded'])
                : (array[placeindex]['isExpanded'] = false)
            );
        }
        setListDataSource(array);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Loader loading={loading} />
                <DatePicker
                    style={styles.datePickerStyle}
                    date={date} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    placeholder="select Date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                        },
                        dateInput: {
                            marginLeft: 36,
                        },
                    }}
                    onDateChange={(date) => {
                        setDate(date);
                        GetExpenseHistory(userId, date)
                    }}
                />
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={styles.titleText}>Invoice
                    <Text style={{ fontStyle: 'italic', fontSize: 8 }}>(Click on items to view details)</Text></Text>

                </View>


                <ScrollView>
                    {
                        listDataSource.map((item, key) => (
                            <ExpandableExpenseHistoryList
                                key={item.dateDescription}
                                onClickFunction={() => {
                                    updateLayout(key);
                                }}
                                item={item}
                            />
                            // <View style={{ flex: 1 }} key={key1}>
                            //     <Text>{item1.dateDescription}</Text>
                            //     {
                            //         item1.dailyexpense.map((item, key) => (
                            //             <ExpandableExpenseHistoryList
                            //                 key={item.dateDescription}
                            //                 onClickFunction={() => {
                            //                     updateLayout(key);
                            //                 }}
                            //                 item={item}
                            //             />
                            //         ))
                            //     }
                            // </View>
                        ))
                    }

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ExpenseHistoryScreen

const styles = StyleSheet.create({
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
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
