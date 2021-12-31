import React, { Component, useState } from 'react'
import { SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { ShoppingProductList } from '../utility/StaticData'
import { SearchBar, CheckBox, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyBasketScreen = ({ navigation }) => {
    const [listItems, setListItems] = useState(ShoppingProductList);
    const [masterDataSource, setMasterDataSource] = useState(ShoppingProductList);
    const [search, setSearch] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [ids, setIds] = useState([]);

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = listItems.filter(
                function (item) {
                    const itemData = item.value
                        ? item.value.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setListItems(newData);
            setSearch(text);
        } else {
            console.log('1 ', listItems)
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setListItems(masterDataSource);
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
    const getItem = (item) => {
        //Function for click on an item
        alert('Id: ' + item.id + ' Value: ' + item.value);
    };

    const ItemView = ({ item }) => {
        return (
            // FlatList Item
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, alignContent: 'flex-start', alignItems: 'flex-start' }}>
                    <CheckBox
                        // iconRight
                        title={item.value}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"

                    />
                    {/* <Text
                        style={styles.item}
                        onPress={() => getItem(item)}>
                        {item.value}
                    </Text> */}
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'flex-end', alignItems: 'flex-end', padding: 15 }}>
                    <View style={{ flex: 1 }}>
                        <Button
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
            <View style={styles.mainBody} >
                <View>
                    <SearchBar
                        placeholder="Search Here..."
                        onChangeText={searchFilterFunction}
                        value={search}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={listItems}
                        //data defined in constructor
                        ItemSeparatorComponent={ItemSeparatorView}
                        //Item Separator View
                        renderItem={ItemView}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={() =>
                        navigation.navigate('AddShoppingListScreen')
                    } style={styles.TouchableOpacityStyle} >
                        <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}
                            style={styles.FloatingButtonStyle} />
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    )
}

export default MyBasketScreen

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
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
    }
});
