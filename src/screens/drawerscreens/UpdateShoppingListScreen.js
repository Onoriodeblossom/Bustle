import React, { createRef, useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    Image,
    Switch,
    TouchableOpacity,
    Alert
} from 'react-native'
import Loader from '../components/Loader';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from "react-hook-form";
import { EditShoppingList } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';

const UpdateShoppingListScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [errortext, setErrortext] = useState('');
    const [currentSellingPrice, SetCurrentSellingPrice] = useState(0);
    const [variationName, setVariationName] = useState('');
    const [userId, setUserId] = useState(0);
    const [productId, setProductId] = useState(0);
    const purchasepriceInputRef = createRef();
    const sellingpriceInputRef = createRef();
    const item = route.params.item
    useEffect(() => {
        setVariationName(item.variationName)
        AsyncStorage.getItem('id').then(value => {
            setUserId(value)
            setLoading(true);
            let id = item.id
            fetch(`http://bustle.ticketplanet.ng/GetProductPrice/${id}`, {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    setLoading(false);
                    SetCurrentSellingPrice(responseJson.sellingPrice)
                    const fields = ['sellingPrice'];
                    fields.forEach(field => setValue(field, responseJson[field]));
                }).catch(error => {
                    setLoading(false);
                    console.error(error);
                });
        })
    }, []);

    const updateShoppingList = (data) => {
        return EditShoppingList(data)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Success', responseJson.responseText)
                    navigation.navigate('ShoppingListInventoryScreen')
                } else {
                    setErrortext(responseJson.responseText);
                }
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const handleSubmitPress = data => {

        setErrortext('');
        setLoading(true);
        let dataToSend = { ...data, "userId": parseInt(userId), productId: item.productId, productVariationId: item.id };
        updateShoppingList(dataToSend)
    };
    return (
        <View style={{ flex: 1 }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    value={value}
                                    style={styles.inputStyle}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(parseInt(value))}
                                    underlineColorAndroid="#f000"
                                    placeholder="Quantity Purchased"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="numeric"
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        purchasepriceInputRef.current && purchasepriceInputRef.current.focus()
                                    }
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
                                    value={value}
                                    style={styles.inputStyle}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(parseFloat(value))}
                                    underlineColorAndroid="#f000"
                                    placeholder="Purchase Price"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="numeric"
                                    ref={purchasepriceInputRef}
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        sellingpriceInputRef.current && sellingpriceInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            )}
                            name="purchasePrice"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.purchasePrice && <Text style={styles.ErrorMesage}>Purchase Price is required!</Text>}
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
                                    ref={sellingpriceInputRef}
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
                        <Text style={styles.buttonTextStyle}>UPDATE</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </ScrollView>
        </View>
    )
}
export default UpdateShoppingListScreen
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
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
        borderRadius: 30,
        borderColor: '#dadae8',
    }
});
