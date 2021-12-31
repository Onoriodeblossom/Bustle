import React, { Component, useState, useEffect } from 'react'
import { RefreshControl, Alert, Text, View, StyleSheet, FlatList, TouchableOpacity, Image, SectionList } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { SearchBar, CheckBox, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
const TrackCreditScreen = ({ route, navigation }) => {

    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('id').then(value => {
                setUserId(value)
                LoadCreditors(value);
            });
        })
        return () => {
            setCreditorsList([])
            unsubscribe
        }
    }, [navigation]);
    const [loading, setLoading] = useState(false);
    const [creditorsList, setCreditorsList] = useState([]);
    const [totalCredits, setTotalCredits] = useState(0);
    const [masterDataSource, setMasterDataSource] = useState(creditorsList);
    const [search, setSearch] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [ids, setIds] = useState([]);
    const [userId, setUserId] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {

    })
    const searchFilterFunction = (text) => {
        if (text) {
            const newData = setCreditorsList.filter(
                function (item) {
                    const itemData = item.customerDetails
                        ? item.customerDetails.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setCreditorsList(newData);
            setSearch(text);
        } else {
            setCreditorsList(masterDataSource);
            setSearch(text);
        }
    };
    const ItemSeparatorView = () => {
        return (
            // FlatList Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8'
                }}
            />
        );
    };
    const LoadCreditors = async (value) => {
        setLoading(true);
        await fetch(`http://bustle.ticketplanet.ng/GetAllCreditSales/${value}`, {
            method: 'Get',
            headers: {
                //Header Defination
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setLoading(false);
                setCreditorsList(responseJson)
                var total_Credits = 0;

                responseJson.forEach(funds => {
                    total_Credits += parseFloat(funds.amount);
                });
                setTotalCredits(total_Credits)
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const updateItem = (item) => {
        navigation.navigate('UpdateCreditScreen', { id: item.id })
    };

    const ItemView = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', alignContent: 'center' }
            }>
                <TouchableOpacity
                    style={{
                        flex: 1
                    }}
                    activeOpacity={0.4}
                    onPress={() => getItem(item)}
                >
                    <View >
                        <Text
                            style={styles.item}
                        >
                            {item.customerDetails}
                        </Text>


                    </View>

                </TouchableOpacity>
                <View style={{
                    flex: 1
                }}>
                    <Text
                        style={styles.item}
                    >
                        {item.amount}
                    </Text>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Text
                        style={styles.item}
                    >
                        {item.registrationDate}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    alignContent: 'flex-end',
                    alignItems: 'flex-end',
                    paddingRight: 15
                }}>
                    {/* <Button
                        onPress={() => updateItem(item)}
                        buttonStyle={{ backgroundColor: 'green' }}
                        icon={
                            <Icon
                                name="edit"
                                size={10}
                                color="white"
                            />
                        }
                    /> */}
                    <TouchableOpacity activeOpacity={0.2} onPress={() => updateItem(item)}>
                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Update</Text>
                    </TouchableOpacity>

                </View>
            </View>

        );
    };
    return (
        <View style={{ flex: 1 }}>
            <Loader loading={loading} />
            <View style={styles.mainBody} >
                <View>
                    <SearchBar
                        lightTheme={true}
                        placeholder="Search Here..."
                        onChangeText={searchFilterFunction}
                        value={search}
                    />
                </View>
                <View style={{ height: 40, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignContent: 'flex-start', paddingLeft: 10, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{creditorsList.length}</Text>
                        <Text>Creditors</Text>
                    </View>
                    <View style={{
                        alignContent: 'flex-end', paddingRight: 10, alignItems: 'flex-end',
                        justifyContent: 'flex-end', flex: 1
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>{totalCredits}</Text>
                        <Text>Total Credit</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20, paddingLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Current Creditors</Text>
                </View>
                <View style={{
                    flexDirection: 'row', alignContent: 'center',
                    justifyContent: 'center', alignItems: 'center'
                }
                }>
                    <TouchableOpacity
                        style={{
                            flex: 1
                        }}
                        activeOpacity={0.4}
                        onPress={() => getItem(item)}
                    >
                        <View >
                            <Text style={styles.smallitem}>Name</Text>


                        </View>

                    </TouchableOpacity>
                    <View style={{
                        flex: 1
                    }}>
                        <Text style={styles.smallitem}>Amount</Text>
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <Text style={styles.smallitem}>Date</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        alignContent: 'flex-end',
                        alignItems: 'flex-end',
                        padding: 15
                    }}>
                        <Text style={styles.smallitem}>Action</Text>

                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={creditorsList}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

            </View>
        </View>
    )
}

export default TrackCreditScreen

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    item: {
        paddingLeft: 10,
        fontSize: 12
    },
    smallitem: {
        paddingLeft: 10,
        fontSize: 10,
        fontWeight: '700'
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
