import React, { createRef, useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    SafeAreaView,
    Switch,
    TouchableOpacity,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from "react-hook-form";
import { EditCategory } from '../utility/UserService'
import { AddCategory } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { values, conforms } from 'lodash';
import { Button } from 'react-native-elements';
import { AddShoppingList } from '../utility/UserService'

const DraftShoppingListScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [errortext, setErrortext] = useState('');
    const [serverData, setServerData] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);
    const [productVariationId, setProductVariationId] = useState(0);
    const [productId, setProductId] = useState(0);
    const [variationName, setVariationName] = useState('');
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        AsyncStorage.getItem('id').then(value => {
            setUserId(value)
            fetch(`http://bustle.ticketplanet.ng/GetProductVariationByUserId/${value}`, {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    setLoading(false);
                    setServerData(responseJson)
                }).catch(error => {
                    setLoading(false);
                    console.error(error);
                });
        })
    }, []);

    const SaveShoppingList = (data) => {
        Alert.alert("Alert", 'Are you sure you want to commit this ShoppingList?',
            [
                {
                    text: "Yes",
                    onPress: () => {
                        commitShoppingList()
                    }
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ]
        )

    }

    const commitShoppingList = () => {
        setLoading(true);
        return AddShoppingList(shoppingList)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Success', responseJson.responseText)
                    setShoppingList([])
                } else {
                    setErrortext(responseJson.responseText);
                }
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const DeleteItem = (Deleteitem) => {
        Alert.alert("Alert", 'Are you sure you want to delete this Item?',
            [
                {
                    text: "Yes",
                    onPress: () => {
                        let itemTobeDeleted = shoppingList
                        itemTobeDeleted.splice(Deleteitem, 1)
                        setShoppingList([...itemTobeDeleted]);
                    }
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ]
        )

    };
    const handleSubmitPress = data => {
        shoppingList.push({
            "userId": parseInt(userId), productId: productId,
            quantity: data.quantity, variationName: variationName,
            productVariationId: productVariationId, sellingPrice: data.sellingPrice
        })
        setValue('productName', '')
        setValue('quantity', 0)
        setValue('sellingPrice', 0)
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader loading={loading} />
            <View style={{
                justifyContent: 'center',
                alignContent: 'center'
            }}>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <SearchableDropdown
                            onTextChange={(text) => console.log(text)}
                            onItemSelect={(item) => {
                                setValue('productName', item.name)
                                setValue('sellingPrice', item.sellingPrice)
                                setVariationName(item.name)
                                setProductVariationId(item.id)
                                setProductId(item.productId)
                            }}
                            containerStyle={styles.inputStylesearch}
                            textInputStyle={{
                                padding: 12,
                                borderColor: '#ccc',
                                backgroundColor: '#FAF7F6',
                                color: 'black',
                                width: '100%'
                            }}
                            itemStyle={{
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#FAF9F8',
                                borderColor: '#bbb',
                                borderWidth: 1,
                            }}
                            itemTextStyle={{
                                color: 'black',
                            }}
                            itemsContainerStyle={{
                                maxHeight: '100%',

                            }}
                            items={serverData}
                            defaultIndex={2}
                            placeholder="placeholder"
                            resetValue={false}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    value={value}
                                    style={styles.inputStyle}
                                    onBlur={onBlur}
                                    editable={false}
                                    onChangeText={value => onChange(value)}
                                    underlineColorAndroid="#f000"
                                    placeholder="Product Name"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                            )}
                            name="productName"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.productName && <Text style={styles.ErrorMesage}>Product Name is required!</Text>}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    value={value ? value.toString() : value}
                                    style={styles.inputStyle}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(parseInt(value))}
                                    underlineColorAndroid="#f000"
                                    placeholder="Quantity Purchased"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="numeric"
                                    returnKeyType="next"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                            )}
                            name="quantity"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.quantity && <Text style={styles.ErrorMesage}>Quantity is required!</Text>}
                    </View>

                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    value={value ? value.toString() : value}
                                    style={styles.inputStyle}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(parseFloat(value))}
                                    underlineColorAndroid="#f000"
                                    placeholder="Selling Price"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="numeric"
                                    returnKeyType="next"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                            )}
                            name="sellingPrice"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.sellingPrice && <Text style={styles.ErrorMesage}>Selling Price is required!</Text>}
                    </View>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmit(handleSubmitPress)}
                    >
                        <Text style={styles.buttonTextStyle}>ADD TO LIST</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <ScrollView contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    paddingLeft: 20
                }}>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 10 }}>Products</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 10 }}>Quantity to purchase</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 10 }}>Action</Text>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: 'black', width: 280 }}></View>
                    {
                        shoppingList.length > 0 ? shoppingList.map((value, index) => {
                            return (<View style={{ flexDirection: 'row', paddingTop: 10 }} key={index}>
                                <View style={{ flex: 1 }}>
                                    <Text>{value.variationName}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>{value.quantity}</Text>
                                </View>
                                <View style={{ flex: 1, width: 30 }}>

                                    <Button
                                        onPress={() => DeleteItem(value)}
                                        buttonStyle={{ backgroundColor: 'red', width: 50 }}
                                        icon={
                                            <Icon
                                                name="trash"
                                                size={7}
                                                color="white"

                                            />
                                        }

                                    />
                                </View>

                            </View>);
                        }) : null
                    }
                    {
                        shoppingList.length > 0 ?
                            <View>
                                <Text>{errortext}</Text>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    activeOpacity={0.5}
                                    onPress={() => SaveShoppingList()}
                                >
                                    <Text style={styles.buttonTextStyle}>SAVE</Text>
                                </TouchableOpacity>
                            </View> : null

                    }
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}
export default DraftShoppingListScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    titleText: {
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headingText: {
        padding: 8,
    },
    SectionStyle: {
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    SectionStyleImage: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        margin: 10,
    },
    textStyle: {
        padding: 10,
        color: 'black',
    },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        padding: 5,
    },
    imageStyle: {
        width: 50,
        height: 50,
        marginLeft: 50
    },
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
    MultiSectionStyle: {
        flexDirection: 'row',
        height: 80,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    ErrorSectionStyle: {
        marginLeft: 35,
        marginRight: 35
    },
    ErrorMesage: {
        fontSize: 9,
        color: 'red'
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: '#dadae8',
    },
    inputStylesearch: {
        flex: 1,
        color: 'black',
        borderWidth: 1,
        borderColor: '#dadae8',
    }
});
