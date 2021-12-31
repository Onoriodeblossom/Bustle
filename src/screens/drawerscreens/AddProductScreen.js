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
import AsyncStorage from '@react-native-community/async-storage';
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { useForm, Controller } from "react-hook-form";
import { EditProduct } from '../utility/UserService'
import { AddProduct } from '../utility/UserService'
import { UserDetails } from '../utility/StaticData'

const AddProductScreen = ({ route, navigation }) => {
    const [productName, setProductName] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [sellingPrice, setSellingPrice] = useState(0);
    const [costPrice, setCostPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [loading, setLoading] = useState(false);
    const [enableChangeImage, setEnableChangeImage] = useState(false);
    const [stockPicture, setStockPicture] = useState('');
    const [profitMargin, setProfitMargin] = useState('');
    const [inventoryValue, setInventoryValue] = useState('');
    const [reorderLevel, setReorderLevel] = useState('');
    const [userId, setUserId] = useState(0);
    const [filePath, setFilePath] = useState({});
    const [isEnabled, setIsEnabled] = useState(false);
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [errortext, setErrortext] = useState('');
    const productDescInputRef = createRef();
    const categoryInputRef = createRef();


    const Idparam = route.params;
    const isAddMode = !Idparam || Idparam === undefined ? true : false;

    useEffect(() => {
        setEnableChangeImage(isAddMode)
        AsyncStorage.getItem('id').then(value => {
            //console.log('dddd', value)
            setUserId(value)
            GetAllCategory(value)
            if (!isAddMode) {
                navigation.setOptions({ headerTitle: 'Edit Product' });
                setLoading(true);
                let id = route.params.id
                fetch(`http://bustle.ticketplanet.ng/GetProductById/${value}/${id}`, {
                    method: 'Get',
                    headers: {
                        //Header Defination
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(responseJson => {
                        setLoading(false);
                        setImageUrl(responseJson.productImgUrl)
                        const fields = ['productName', 'categoryId'];
                        fields.forEach(field => setValue(field, responseJson[field]));
                    }).catch(error => {
                        setLoading(false);
                        console.error(error);
                    });
            }
        });
    }, []);
    const GetAllCategory = (userId) => {
        fetch(`http://bustle.ticketplanet.ng/GetCategory/${userId}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setCategoryList(responseJson)
            }).catch(error => {
                console.error(error);
            });
    }
    const changePicture = () => {
        setEnableChangeImage(true)
    }
    const addProduct = (data) => {
        let updatedata = { ...data, "userId": parseInt(userId), productImgUrl: '' };
        var formData = new FormData();
        formData.append("ProductName", data.productName)
        formData.append("CategoryId", data.categoryId)

        if (Object.keys(filePath).length != 0) {
            console.log('----------------')
            formData.append("ChangeProductImage", 3)
            formData.append("FileName", filePath.fileName)
            formData.append("FormFile", {
                uri: filePath.uri,
                name: filePath.fileName,
                type: filePath.type
            })
        } else {
            formData.append("ChangeProductImage", 2)
        }
        formData.append("UserId", parseInt(userId))
        console.log('Add data ', formData)
        return AddProduct(formData)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Success', responseJson.responseText)
                    navigation.navigate('ProductListScreen')
                } else {
                    setErrortext(responseJson.responseText);
                }
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const updateProduct = (id, data) => {
        let updatedata = { ...data, "id": id };

        var formData = new FormData();
        formData.append("id", id)
        formData.append("ProductName", data.productName)
        formData.append("CategoryId", data.categoryId)
        if (Object.keys(filePath).length != 0) {
            if (!enableChangeImage) {
                formData.append("ChangeProductImage", 1)
                formData.append("FileName", filePath.fileName)
                formData.append("FormFile", {
                    uri: filePath.uri,
                    name: filePath.fileName,
                    type: filePath.type
                })
            }
        }
        return EditProduct(formData)
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
            updateProduct(route.params.id, data)
        else {
            let dataToSend = { ...data, "userId": parseInt(userId) };
            addProduct(dataToSend)
        }
    };
    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            setFilePath(response);
        });
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
                                    onChangeText={value => onChange(value)}
                                    underlineColorAndroid="#f000"
                                    placeholder="Product Name"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        categoryInputRef.current && categoryInputRef.current.focus()
                                    }
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

                                <Picker
                                    selectedValue={value ? value.toString() : value}
                                    style={styles.inputStyle}
                                    ref={categoryInputRef}
                                    onValueChange={(value, itemIndex) => value ? onChange(parseInt(value)) : onChange(value)}
                                >
                                    <Picker.Item label="-Select Category-" value="" />

                                    {categoryList.map((item, key) =>
                                        <Picker.Item label={item.categoryName} value={item.id.toString()} key={key} />
                                    )}
                                </Picker>

                            )}
                            name="categoryId"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.category && <Text style={styles.ErrorMesage}>Category is required!</Text>}
                    </View>
                    {enableChangeImage ?
                        <View style={styles.SectionStyleImage}>
                            {Object.keys(filePath).length != 0 ?
                                <Image
                                    source={{
                                        uri: filePath.uri,
                                    }}
                                    style={styles.imageStyle}
                                />
                                : null}
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.buttonStyle}
                                onPress={() => chooseFile('photo')}>
                                <Text style={styles.textStyle}>
                                    Choose Image
                            </Text>
                            </TouchableOpacity>
                            {Object.keys(filePath).length != 0 ?
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={styles.buttonStyle}
                                    onPress={() => chooseFile('photo')}>
                                    <Text style={styles.textStyle}>
                                        Remove Image
                            </Text>

                                </TouchableOpacity>
                                : null}
                        </View>
                        :
                        <View style={styles.SectionStyleImage}>
                            {
                                imageUrl ?
                                    <Image
                                        source={{
                                            uri: imageUrl,
                                        }}
                                        style={styles.imageStyle}
                                    /> : null
                            }
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.buttonStyle}
                                onPress={() => changePicture()}>
                                <Text style={styles.textStyle}>
                                    Edit Picture
                            </Text>
                            </TouchableOpacity>
                        </View>
                    }
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

export default AddProductScreen
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
