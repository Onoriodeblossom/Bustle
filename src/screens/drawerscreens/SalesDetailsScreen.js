import React, { Component, useState } from 'react'
import { SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity, Image, SectionList } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { SalesDetailsData } from '../utility/StaticData'
import { SearchBar, CheckBox } from 'react-native-elements';
import { SalesData } from '../utility/StaticData'

const SalesDetailsScreen = ({ navigation }) => {
    const [listItems, setListItems] = useState(SalesData);
    const [masterDataSource, setMasterDataSource] = useState(SalesData);
    const [search, setSearch] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [ids, setIds] = useState([]);

    const searchFilterFunction = (text) => {
        if (text) {
            console.log('1')
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
        alert('Id: ' + item.id + ' Value: ' + item.value);
    };
    const ItemView = ({ item }) => {
        return (
            <View View style={{ flexDirection: 'row', height: 80, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }
            }>

                <View style={{ flex: 1, alignContent: 'flex-start', alignItems: 'flex-start' }}>

                    <Text
                        style={styles.item}
                        onPress={() => getItem(item)}>
                        {item.title}
                    </Text>
                </View>
                <View style={{ flex: 1, alignContent: 'flex-end', alignItems: 'flex-end' }}>

                    <Text
                        style={styles.item}
                        onPress={() => getItem(item)}>
                        {item.Total}
                    </Text>
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
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </View>

            </View>
        </View>
    )
}
export default SalesDetailsScreen

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
    },
    sectionHeaderStyle: {
        backgroundColor: '#307ecc',
        fontSize: 20,
        padding: 5,
        color: '#fff',
    }
});
