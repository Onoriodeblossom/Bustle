import React, { Component, useState, useEffect } from 'react'
import { SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity, Image, SectionList } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { SearchBar, CheckBox, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
const StocksListScreen = ({ route, navigation }) => {

    useEffect(async () => {
        AsyncStorage.getItem('id').then(value => {
            setLoading(true);
            fetch(`http://bustle.ticketplanet.ng/GetProducts/${value}`, {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    setLoading(false);
                    setProductList(responseJson)
                }).catch(error => {
                    setLoading(false);
                    console.error(error);
                });
        })
    }, []);
    const [loading, setLoading] = useState(false);
    const [productList, setProductList] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState(productList);
    const [search, setSearch] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [ids, setIds] = useState([]);

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = productList.filter(
                function (item) {
                    const itemData = item.productName
                        ? item.productName.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setProductList(newData);
            setSearch(text);
        } else {
            setProductList(masterDataSource);
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
    const getItem = (item) => {
        navigation.navigate('ViewStocksDetailsScreen', { id: item.id, productName: item.productName })
    };
    const ItemView = ({ item }) => {
        return (
            <View >
                <View
                    style={{ flexDirection: 'row', height: 70 }
                    }
                >
                    <View style={{
                        flex: 1,
                        alignContent: 'stretch',
                    }}>
                        {item.productImgUrl !== "" ? <Image
                            source={{ uri: item.productImgUrl }}
                            style={{ width: 70, height: 67 }}
                        /> : <Image
                                source={require('../../images/default_image.png')}
                                style={{ width: 70, height: 67, opacity: 0.2 }}
                            />}

                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <Text
                            style={styles.item}
                        >
                            {item.productName}
                        </Text>
                        <Text
                            style={styles.smallitem}
                        >
                            {item.category}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <Text
                            style={styles.item}
                        >
                            {item.currentStock}
                        </Text>

                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <Button
                            onPress={() => getItem(item)}
                            buttonStyle={{ backgroundColor: 'green', width: 70 }}
                            icon={
                                <Icon
                                    name="edit"
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
                    />
                </View>
                <View
                    style={{ flexDirection: 'row', height: null }
                    }
                >
                    <View style={{
                        flex: 1,
                        alignContent: 'stretch',
                    }}>
                        <Text
                            style={{ fontSize: 10, fontWeight: '700' }}
                        >#</Text>
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <Text
                            style={{ fontSize: 10, fontWeight: '700' }}
                        >
                            Product Name
                        </Text>

                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <Text
                            style={{ fontSize: 10, fontWeight: '700' }}
                        >
                            Total Stock
                        </Text>

                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <Text
                            style={{ fontSize: 10, fontWeight: '700' }}
                        >
                            Action
                        </Text>

                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={productList}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </View>
    )
}

export default StocksListScreen

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
