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
    Alert,
    TouchableOpacity
} from 'react-native'
import Loader from '../components/Loader';
import { useForm, Controller } from "react-hook-form";
import { EditProductVariation } from '../utility/UserService'
import { AddProductVariation } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';

const AddProductVariationScreen = ({ route, navigation }) => {
    const [stockName, setStockName] = useState('');
    const [sKU, setSKU] = useState('');
    const [sellingPrice, setSellingPrice] = useState(0);
    const [costPrice, setCostPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [loading, setLoading] = useState(false);
    const [stockPicture, setStockPicture] = useState('');
    const [profitMargin, setProfitMargin] = useState('');
    const [inventoryValue, setInventoryValue] = useState('');
    const [reorderLevel, setReorderLevel] = useState('');
    const [filePath, setFilePath] = useState({});
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [errortext, setErrortext] = useState('');
    const productName = route.params.productName
    const productId = route.params.productId
    const [userId, setUserId] = useState(0);
    const stockDescInputRef = createRef();
    const purchaseInputRef = createRef();
    const sellingpriceInputRef = createRef();
    const quantityInputRef = createRef();
    const reorderLevelInputRef = createRef();
    const skuInputRef = createRef();
    const numberInStockRef = createRef();

    const Idparam = route.params;
    let isAddMode = true;//!Idparam || Idparam === undefined ? true : false;
    console.log('jj', Idparam)
    if (Idparam) {
        console.log('is not em')
        if (!Idparam.isAdd) {
            isAddMode = false
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('id').then(value => {
            setUserId(value)
            console.log('isAddMode', isAddMode)
            if (!isAddMode) {
                setLoading(true);
                let id = route.params.id;

                fetch(`http://bustle.ticketplanet.ng/GetAllProductVariationById/${value}/${id}`, {
                    method: 'Get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(responseJson => {
                        setLoading(false);
                        const fields = ['variationName', 'numberInStock', 'sku',
                            'purchasePrice', 'sellingPrice', 'reorderLevel'];
                        fields.forEach(field => setValue(field, responseJson[field]));
                    }).catch(error => {
                        setLoading(false);
                        console.error(error);
                    });
            }
        });
    }, []);

    const addProductVariation = (data) => {
        let dataToSend = { ...data, "userId": parseInt(userId), lowStockAlert: isEnabled, productId: productId };
        return AddProductVariation(dataToSend)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Success', responseJson.responseText)
                } else {
                    setErrortext(responseJson.responseText);
                }
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const updateProductVariation = (id, data) => {
        let updatedata = { ...data, "id": id };
        return EditProductVariation(updatedata)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Success', responseJson.responseText)
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
        if (!isAddMode)
            updateProductVariation(route.params.id, data)
        else {
            let dataToSend = { ...data, "userId": parseInt(userId), lowStockAlert: isEnabled, productId: productId };
            addProductVariation(dataToSend)
        }

    };
    return (
        <View style={{ flex: 1 }}>
            <Loader loading={loading} />
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
            }} >
                <Text style={{
                    color: 'green',
                    fontSize: 20
                }}>{productName}</Text>
            </View>
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
                                    onChangeText={value => onChange(value)}
                                    underlineColorAndroid="#f000"
                                    placeholder="Stock Name"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        skuInputRef.current && skuInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            )}
                            name="variationName"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.variationName && <Text style={styles.ErrorMesage}>Variation Name is required!</Text>}
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
                                    placeholder="Number In stock"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="numeric"
                                    ref={numberInStockRef}
                                    returnKeyType="next"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                            )}
                            name="numberInStock"
                            rules={{ required: true }}
                            defaultValue=""
                        />

                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.numberInStock && <Text style={styles.ErrorMesage}>Stock Number is required!</Text>}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    value={value}
                                    style={styles.inputStyle}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    underlineColorAndroid="#f000"
                                    placeholder="SKU"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                    ref={skuInputRef}
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        purchaseInputRef.current && purchaseInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            )}
                            name="sku"
                            rules={{ required: false }}
                            defaultValue=""
                        />
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
                                    placeholder="Purchase Price"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="numeric"
                                    ref={purchaseInputRef}
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
                                    onSubmitEditing={() =>
                                        reorderLevelInputRef.current && reorderLevelInputRef.current.focus()
                                    }
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
                                    placeholder="Reorder Level"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="numeric"
                                    ref={reorderLevelInputRef}
                                    returnKeyType="next"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                            )}
                            name="reorderLevel"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.reorderLevel && <Text style={styles.ErrorMesage}>Reorder Level is required!</Text>}
                    </View>
                    <View style={styles.SectionStyleImage}>
                        <Text>Low stock alert</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmit(handleSubmitPress)}
                    >
                        <Text style={styles.buttonTextStyle}>{isAddMode ? "CREATE" : "UPDATE"}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default AddProductVariationScreen
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
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
