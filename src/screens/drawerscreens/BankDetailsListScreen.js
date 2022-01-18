import React, { Component, useState, useEffect } from 'react'
import { SafeAreaView, Alert, Text, View, StyleSheet, FlatList, TouchableOpacity, Image, SectionList } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { ProductData } from '../utility/StaticData'
import { SearchBar, CheckBox, Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';
import { DeleteBankDetails } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';
const BankDetailsListScreen = ({ navigation }) => {
    //const isFocused = useIsFocused();
    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('id').then(value => {
                console.log('ysu', value)
                setUserId(value)
                LoadBankDetails(value)
            });
        })
        return () => {
            setBankDetailsList([])
            unsubscribe
        }

    }, [navigation]);
    const [loading, setLoading] = useState(false);
    const [bankDetailsList, setBankDetailsList] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState(ProductData);
    const [search, setSearch] = useState('');
    const [ids, setIds] = useState([]);
    const [userId, setUserId] = useState(0);

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = categoryList.filter(
                function (item) {
                    const itemData = item.accountName
                        ? item.accountName.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setBankDetailsList(newData);
            setSearch(text);
        } else {
            setBankDetailsList(masterDataSource);
            setSearch(text);
        }
    };
    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8'
                }}
            />
        );
    };
    const LoadBankDetails = (value) => {
        setLoading(true);
        fetch(`http://bustle.ticketplanet.ng/GetAllBankAccountByName/${value}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log('Bank', responseJson)
                setLoading(false);
                setBankDetailsList(responseJson)
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const editItem = (item) => {
        navigation.navigate('AddBankDetailsScreen', { id: item.id })
    };
    const DeleteAccount = (id) => {
        setLoading(true);
        let dataToSend = { Id: id };
        return DeleteBankDetails(dataToSend)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Success', responseJson.responseText)
                    LoadBankDetails();
                } else {
                    setErrortext(responseJson.responseText);
                }
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const DeleteItem = (item) => {
        Alert.alert("Warning", 'Are you sure you want to delete the following item?',
            [
                {
                    text: "Yes",
                    onPress: () => {
                        DeleteAccount(item.id)
                    }
                },
                {
                    text: "No",
                    onPress: () => {
                        console.log("Cancel Delete")
                    },
                    style: "cancel"
                }
            ]
        )
    };
    const ItemView = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', height: 70, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }
            }>
                <View style={{
                    flex: 1,
                    alignContent: 'flex-start',
                    width: 200, alignItems: 'flex-start'
                }}>
                    <Text
                        style={styles.item}
                    >
                        {item.accountName}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    alignContent: 'flex-start',
                    width: 200, alignItems: 'flex-start'
                }}>
                    <Text
                        style={styles.item}
                    >
                        {item.accountNo}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    alignContent: 'flex-start',
                    width: 200, alignItems: 'flex-start'
                }}>
                    <Text
                        style={styles.item}
                    >
                        {item.bankName}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'flex-end',
                    alignItems: 'flex-end',
                    padding: 15
                }}>
                    <View style={{ flex: 1 }}>
                        <Button
                            onPress={() => editItem(item)}
                            buttonStyle={{ backgroundColor: 'green' }}
                            icon={
                                <Icon
                                    name="edit"
                                    size={10}
                                    color="white"

                                />
                            }

                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 5 }}>
                        <Button
                            onPress={() => DeleteItem(item)}
                            buttonStyle={{ backgroundColor: '#EB2311' }}
                            icon={
                                <Icon
                                    name="trash"
                                    size={10}
                                    color="white"
                                />
                            }

                        />
                    </View>

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
                        containerStyle={{backgroundColor:"blue"}}
                        leftIconContainerStyle={{}}
                        inputStyle={{backgroundColor:"red"}}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={bankDetailsList}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={() =>
                        navigation.navigate('AddBankDetailsScreen')
                    } style={styles.TouchableOpacityStyle} >
                        <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}
                            style={styles.FloatingButtonStyle} />
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    )
}

export default BankDetailsListScreen

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    item: {
        paddingLeft: 20,
        paddingTop: 10,
        fontSize: 10
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
