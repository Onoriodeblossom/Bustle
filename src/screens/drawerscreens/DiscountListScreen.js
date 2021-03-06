import React, { Component, useState, useEffect } from 'react'
import { SafeAreaView, Alert, Text, View, StyleSheet, FlatList, TouchableOpacity, Image, SectionList } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { SearchBar, ListItem, Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';
import { DeleteDiscount } from '../utility/UserService'
import Add from "../../images/add.png"
import AsyncStorage from '@react-native-community/async-storage';
const DiscountListScreen = ({ route, navigation }) => {
    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('id').then(value => {
                setUserId(value)
                LoadDiscount(value)
            });
        })
        return () => {
            setDiscountList([])
            unsubscribe
        }

    }, [navigation]);
    const [loading, setLoading] = useState(false);
    const [discountList, setDiscountList] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState(discountList);
    const [search, setSearch] = useState('');
    const [ids, setIds] = useState([]);
    const [userId, setUserId] = useState(0);
    const searchFilterFunction = (text) => {
        if (text) {
            const newData = discountList.filter(
                function (item) {
                    const itemData = item.discountName
                        ? item.discountName.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setDiscountList(newData);
            setSearch(text);
        } else {
            setDiscountList(masterDataSource);
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
    const LoadDiscount = (value) => {
        setLoading(true);
        fetch(`http://bustle.ticketplanet.ng/GetDiscount/${value}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setLoading(false);
                setDiscountList(responseJson)
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const editItem = (item) => {
        navigation.navigate('AddDiscountScreen', { id: item.id })
    };
    const DeleteDis = (id) => {
        setLoading(true);
        let dataToSend = { Id: id };
        return DeleteDiscount(dataToSend)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Success', responseJson.responseText)
                    LoadDiscount();
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
                        DeleteDis(item.id)
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
            <View style={{
                
                flexDirection: 'row',
                height: 70,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            }
            }>
                <View style={{
                    flex: 1,
                    alignContent: 'flex-start',
                    width: 200, alignItems: 'flex-start'
                }}>
                    <Text
                        style={styles.item}
                    >
                        {item.discountName}
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
                        {item.rate}
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
            }
            bottomDivider>
            <Icon name={'file-text-o'} />
            <ListItem.Content>
                <ListItem.Title>{item.discountName}</ListItem.Title>
                <ListItem.Subtitle>{item.discountType == 'AMOUNT' ? '\u20A6' : '%'} {item.rate}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem.Swipeable>
    )
    return (
        <View style={{ flex: 1 }}>
            <Loader loading={loading} />
            <View style={styles.mainBody} >
                <View style={{paddingVertical:20, paddingHorizontal:20}}>
                    <SearchBar
                        lightTheme={true}
                        placeholder="Search Here..."
                        onChangeText={searchFilterFunction}
                        value={search}
                        containerStyle={{backgroundColor:"transparent", }}
                        inputContainerStyle={{backgroundColor:"transparent"}}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={discountList}
                        renderItem={renderItem}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={() =>
                        navigation.navigate('AddDiscountScreen')
                    } style={styles.TouchableOpacityStyle} >
                        <Image source={Add}
                            style={styles.FloatingButtonStyle} />
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    )
}

export default DiscountListScreen

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
