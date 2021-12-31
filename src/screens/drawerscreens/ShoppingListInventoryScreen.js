import React, { Component, useState, useEffect } from 'react'
import { PermissionsAndroid, Alert, Text, View, StyleSheet, FlatList, TouchableOpacity, Image, SectionList } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { SearchBar, CheckBox, Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';
import { DeleteCategory } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx'

const ShoppingListInventoryScreen = ({ route, navigation }) => {
    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('id').then(value => {
                setUserId(value)
                LoadShoppingList(value)
            });
        })
        return () => {
            setShoppingList([])
            setTemplateFile('')
            unsubscribe
        }

    }, [navigation]);
    const [loading, setLoading] = useState(false);
    const [shoppingList, setShoppingList] = useState([]);
    const [templateFile, setTemplateFile] = useState('');
    const [masterDataSource, setMasterDataSource] = useState(shoppingList);
    const [search, setSearch] = useState('');
    const [productShoppingList, setProductShoppingList] = useState([]);
    const [ids, setIds] = useState([]);
    const [userId, setUserId] = useState(0);
    const searchFilterFunction = (text) => {
        if (text) {
            const newData = shoppingList.filter(
                function (item) {
                    const itemData = item.variationName
                        ? item.variationName.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setShoppingList(newData);
            setSearch(text);
        } else {
            setShoppingList(masterDataSource);
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
    const LoadShoppingList = (value) => {
        setLoading(true);
        fetch(`http://bustle.ticketplanet.ng/GetShoppingListDownload/${value}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setLoading(false);
                setShoppingList(responseJson.productVariation)
                if (responseJson.productVariation) {

                    responseJson.productVariation.map((value, index) => {
                        setProductShoppingList([...productShoppingList, {
                            ProductName: value.variationName,
                            NumberInStock: value.numberInStock,
                            SellingPrice: value.sellingPrice
                        }])
                        console.log('productShoppingListddd', value.variationName)
                    })

                }
                setTemplateFile(responseJson.template)
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const exportDataToExcel = () => {

        let sample_data_to_export = productShoppingList;

        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(sample_data_to_export)
        XLSX.utils.book_append_sheet(wb, ws, "ShoppingList")
        const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

        // Write generated excel to Storage
        RNFS.writeFile(RNFS.ExternalStorageDirectoryPath + '/Download/ShoppingList.xlsx', wbout, 'ascii').then((r) => {
            Alert.alert('Information', `File downloaded sucessfully to ${RNFS.ExternalStorageDirectoryPath}/Download`);
        }).catch((e) => {
            Alert.alert('Error', 'An error occured while downloading file');
        });

    }
    const DownloadShoppingList = async () => {

        try {
            let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            console.log(isPermitedExternalStorage)

            if (!isPermitedExternalStorage) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Allow Permission",
                        message:
                            "Allow permission to save file ",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    exportDataToExcel()

                } else {
                    Alert.alert("permission denied");
                }
            } else {
                exportDataToExcel();
            }
        } catch (err) {
            console.warn(err);
        }
        // try {
        //     const granted = await PermissionsAndroid.request(
        //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        //         {
        //             title: "Allow Permission",
        //             message:
        //                 "Allow permission to save file ",
        //             buttonNeutral: "Ask Me Later",
        //             buttonNegative: "Cancel",
        //             buttonPositive: "OK"
        //         }
        //     );
        //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //         let options = {
        //             html: templateFile,
        //             fileName: 'ShoppingList',
        //             directory: 'Download',
        //         };

        //         let file = await RNHTMLtoPDF.convert(options)
        //         //console.log(file.filePath);
        //         Alert.alert('Information', 'File downloaded sucessfully');
        //     } else {
        //         Alert.alert("permission denied");
        //     }
        // } catch (err) {
        //     console.warn(err);
        // }

    }
    const Update = (item) => {
        navigation.navigate('UpdateShoppingListScreen', { item: item })
    };
    const ItemView = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            }
            }>
                <View style={{
                    flex: 1,
                    alignContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>
                    <Text
                        style={styles.item}
                    >
                        {item.variationName}
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
                        {item.numberInStock}
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
                        {item.reorderLevel}
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
                            onPress={() => Update(item)}
                            buttonStyle={{ backgroundColor: 'green' }}
                            icon={
                                <Icon
                                    name="edit"
                                    size={7}
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
                <View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={DownloadShoppingList}>
                            <Text style={styles.buttonTextStyle}>Download</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
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
                            style={styles.smallitem}
                        >
                            Product
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                        alignContent: 'flex-start',
                        width: 200, alignItems: 'flex-start'
                    }}>
                        <Text
                            style={styles.smallitem}
                        >
                            Current Stock
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                        alignContent: 'flex-start',
                        width: 200, alignItems: 'flex-start'
                    }}>
                        <Text
                            style={styles.smallitem}
                        >
                            Reorder Level
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.smallitem}>Action</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <FlatList
                        data={shoppingList}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

            </View>
        </View>
    )
}

export default ShoppingListInventoryScreen

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    item: {
        paddingLeft: 20,
        fontSize: 12
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    smallitem: {
        paddingLeft: 20,
        paddingTop: 5,
        fontSize: 10
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
