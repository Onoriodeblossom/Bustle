import React, { Component, useState } from 'react'
import { SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { ProductList } from '../utility/StaticData'
import { Provider } from 'react-redux';
import { SearchBar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteItem } from '../../actions/items';
import { useDispatch, useSelector } from 'react-redux'

const ShoppingCartScreen = ({ navigation }) => {
    const [listItems, setListItems] = useState(ProductList);
    const [masterDataSource, setMasterDataSource] = useState(ProductList);
    const [search, setSearch] = useState('');
    const [product, setProduct] = useState('');
    const disptach = useDispatch();
    const deleteCart = (key) => disptach(deleteItem(key));
    const products = useSelector(state => state.items.basketList)
    const cost = useSelector(state => state.items.total)

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

    const getTotal = () => {
        let total = 0;
        const { items } = this.props;
        for (let i = 0; i < items.length; i++) {
            total = total + items[i].cost
        }
        return <Text style={styles.totText}>Total: ${(total).toFixed(2)}</Text>
    }
    const ItemView = ({ item }) => {
        return (
            // FlatList Item
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, alignContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text
                        style={styles.item}>
                        {item.value}
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'flex-end', alignItems: 'flex-end', padding: 15 }}>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 20 }}>
                            {item.count}
                        </Text>

                    </View>
                    <View >
                        <Button
                            buttonStyle={{ backgroundColor: 'green' }}
                            title={"Remove"}
                            onPress={() => deleteCart(item.id)}
                        />
                    </View>



                </View>

            </View>
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.mainBody} >
                <View style={{ flex: 5 }}>

                    <FlatList
                        data={products}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </View>
                <View style={{ flex: 1, height: 100, alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30 }}>
                        Total: {cost}
                    </Text>
                </View>
            </View>
        </View>
    )
}
export default ShoppingCartScreen
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
