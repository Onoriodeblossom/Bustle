import React, { Component, useState, useEffect } from 'react'
import { SafeAreaView, Text, View, StyleSheet, Platform, TouchableOpacity, FlatList, UIManager, SectionList, ScrollView } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { ProductData, CONTENT } from '../utility/StaticData'
import { SearchBar, CheckBox, Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';
import { ListItem, Avatar } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';

const ShoppingListScreen = ({ navigation }) => {

    useEffect(async () => {
        AsyncStorage.getItem('id').then(value => {
            setLoading(true);
            fetch(`http://bustle.ticketplanet.ng/GetShoppingList/${value}`, {
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
        });
    }, []);

    const [listDataSource, setListDataSource] = useState([]);
    const [multiSelect, setMultiSelect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [variationDetails, setVariationDetails] = useState({});

    const keyExtractor = (item, index) => index.toString()
    const renderItem = ({ item }) => (
        <ListItem bottomDivider>
            <Icon name={'file-text-o'} />
            <ListItem.Content>
                <ListItem.Title>{item.variationName}</ListItem.Title>
                <ListItem.Subtitle><Text>Number in stock:</Text> {item.numberInStock}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={listDataSource}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    )
}

export default ShoppingListScreen

const styles = StyleSheet.create({
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
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
