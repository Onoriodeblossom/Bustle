import React, { Component, useState, useEffect } from 'react'
import { SafeAreaView, Alert, Text, View, StyleSheet, FlatList, TouchableOpacity, Image, SectionList } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { SearchBar, ListItem, Button } from 'react-native-elements';
import Loader from '../components/Loader';
import { DeleteProductVariation } from '../utility/UserService'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
const ViewStocksDetailsScreen = ({ route, navigation }) => {
    useEffect(async () => {
        AsyncStorage.getItem('id').then(value => {
            setUserId(value)
            LoadProductVariant(value);
        });
    }, []);

    const [productVariationList, setProductVariationList] = useState({});
    const [masterDataSource, setMasterDataSource] = useState({});
    const [search, setSearch] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [ids, setIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const productName = route.params.productName
    const productId = route.params.id
    const [visible, setVisible] = useState(false);
    const [userId, setUserId] = useState(0);

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = productVariationList.filter(
                function (item) {
                    const itemData = item.variationName
                        ? item.variationName.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setProductVariationList(newData);
            setSearch(text);
        } else {
            setProductVariationList(masterDataSource);
            setSearch(text);
        }
    };
    const LoadProductVariant = (user) => {
        setLoading(true);
        fetch(`http://bustle.ticketplanet.ng/GetAllProductVariation/${user}/${productId}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setLoading(false);
                setProductVariationList(responseJson)
                setMasterDataSource(setMasterDataSource)

            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const editItem = (item) => {
        navigation.navigate('AddProductVariationScreen', { id: item.id })
    };
    const DeleteProdVariant = (id) => {
        setLoading(true);
        let dataToSend = { Id: id };
        return DeleteProductVariation(dataToSend)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Success', responseJson.responseText)
                    LoadProductVariant();
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
                        DeleteProdVariant(item.id)
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
    const ItemView = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                height: 70, alignContent: 'center',
                justifyContent: 'center', alignItems: 'center'
            }
            }>
                <TouchableOpacity
                    // onPress={toggleOverlay}
                    style={{
                        flex: 1,
                        alignContent: 'flex-start',
                        width: 200, alignItems: 'flex-start'
                    }}>
                    <Text
                        style={styles.item}
                    >
                        {item.variationName}
                    </Text>
                </TouchableOpacity>
                <View style={{
                    flex: 1, flexDirection: 'row',
                    alignContent: 'flex-end', alignItems: 'flex-end', padding: 15
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
                <ListItem.Title>{item.variationName}</ListItem.Title>
                <ListItem.Subtitle>Number in stock: {item.numberInStock}</ListItem.Subtitle>
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
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',

                }} >
                    <Text style={{
                        color: 'green',
                        fontWeight: 'bold',
                        fontSize: 30,
                        fontStyle: 'italic'
                    }}>{productName}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={productVariationList}
                        renderItem={renderItem}
                    />

                </View>

            </View>
        </View>
    )
}

export default ViewStocksDetailsScreen

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    item: {
        padding: 20,
        fontSize: 18
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