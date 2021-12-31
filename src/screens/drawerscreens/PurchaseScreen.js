import React, { Component, useState, useEffect } from 'react'
import { RefreshControl, Alert, Text, View, StyleSheet, FlatList, TouchableOpacity, Image, SectionList } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { SearchBar, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';
import { DeletePurchase } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';
const PurchaseScreen = ({ route, navigation }) => {

    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('id').then(value => {
                setUserId(value)
                LoadPurchase(value);
            });
        })
        return () => {
            setPurchaseList([])
            unsubscribe
        }
    }, [navigation]);
    const [loading, setLoading] = useState(false);
    const [purchaseList, setPurchaseList] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState(purchaseList);
    const [search, setSearch] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [ids, setIds] = useState([]);
    const [userId, setUserId] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {

    })
    const searchFilterFunction = (text) => {
        if (text) {
            const newData = purchaseList.filter(
                function (item) {
                    const itemData = item.productName
                        ? item.productName.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setPurchaseList(newData);
            setSearch(text);
        } else {
            setPurchaseList(masterDataSource);
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
    const LoadPurchase = async (UserId) => {
        setLoading(true);
        await fetch(`http://bustle.ticketplanet.ng/GetAllPurchase/${UserId}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setLoading(false);
                setPurchaseList(responseJson)
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const editItem = (item) => {
        navigation.navigate('AddPurchaseScreen', { id: item.id })
    };
    const DeletePur = (id) => {
        setLoading(true);
        let dataToSend = { Id: id };
        return DeletePurchase(dataToSend)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Success', responseJson.responseText)
                    LoadPurchase(userId);
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
                        DeletePur(item.id)
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
                <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => getItem(item)}
                >
                    <View style={{
                        flex: 1,
                        alignContent: 'flex-start',
                        width: 200, alignItems: 'flex-start'
                    }}>
                        <Text
                            style={styles.item}
                        >
                            {item.productName}
                        </Text>
                        <Text
                            style={styles.smallitem}
                        >
                            {item.quantity}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    flex: 1, flexDirection: 'row',
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
    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem.Swipeable
            leftContent={
                <Button
                    title="Edit"
                    onPress={() => editItem(item)}
                    icon={{ name: 'edit', color: 'white' }}
                    buttonStyle={{ minHeight: '100%' }}
                />
            }
            rightContent={
                <Button
                    title="Delete"
                    onPress={() => DeleteItem(item)}
                    icon={{ name: 'delete', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                />
            } bottomDivider
        >
            <Icon name={'file-text-o'} />
            <ListItem.Content>
                <ListItem.Title>{item.productName}</ListItem.Title>
                <ListItem.Subtitle>Quantity: {item.quantity}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem.Swipeable>
    )
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
                <View style={{ flex: 1 }}>
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={purchaseList}
                        renderItem={renderItem}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={() =>
                        navigation.navigate('AddPurchaseScreen')
                    } style={styles.TouchableOpacityStyle} >
                        <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}
                            style={styles.FloatingButtonStyle} />
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    )
}

export default PurchaseScreen

const styles = StyleSheet.create({
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
