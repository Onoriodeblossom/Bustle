import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    SafeAreaView,
    Keyboard,
    Image,
    Switch,
    TouchableOpacity,
    Alert
} from 'react-native'
import { SearchBar, ListItem, Avatar, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const ShoppingListHomeScreen = ({ navigation }) => {
    const [settingsList, setSettingsList] = useState([{ menuName: 'Shopping List from inventory', avatar_url: require('../../images/account_setup.png'), id: 1 },
    { menuName: 'Draft Shopping List', avatar_url: require('../../images/account_setup.png'), id: 2 }]);
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
    const goToItem = (item) => {
        switch (item.id) {
            case 1:
                navigation.navigate('ShoppingListInventoryScreen')
                break;
            case 2:
                navigation.navigate('DraftShoppingListScreen')
                break;
        }

    };
    const ItemView = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }
            }>
                <View style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                }}>
                    <TouchableOpacity onPress={() => goToItem(item)}>
                        <Text
                            style={styles.item}
                        >
                            {item.menuName}
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        );
    };
    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => goToItem(item)} activeOpacity={0.8}>
            <ListItem bottomDivider>
                <Avatar source={item.avatar_url} />

                <ListItem.Content>
                    <ListItem.Title>{item.menuName}</ListItem.Title>
                </ListItem.Content>

                <ListItem.Chevron />

            </ListItem>
        </TouchableOpacity>
    )
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={settingsList}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
};

export default ShoppingListHomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202020"
    },
    item: {
        paddingLeft: 20,
        paddingTop: 10,
        fontSize: 18
    },
});