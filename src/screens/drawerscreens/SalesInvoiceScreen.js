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

    PermissionsAndroid,
    TouchableOpacity,
    Alert
} from 'react-native'
import Loader from '../components/Loader';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from "react-hook-form";
import { AddSales, GenerateInvoice } from '../utility/UserService'
import { SearchBar, CheckBox, Button, Overlay } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
var RNFS = require('react-native-fs');
import Share from 'react-native-share';

const SalesInvoiceScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [errortext, setErrortext] = useState('');
    const [bankDetails, setBankDetails] = useState([]);
    const [businessName, setBusinessName] = useState('');
    const [accountDetails, setAccountDetails] = useState({});
    const [customerDetails, setCustomerDetails] = useState();
    const [salesDetails, setSalesDetails] = useState('n/a');
    const [invoiceSalesDetails, setInvoiceSalesDetails] = useState({});
    const [amount, setAmount] = useState(0);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountValue, setDiscountValue] = useState(0);
    const [originalAmount, setOriginalAmount] = useState(0);
    const [userId, setUserId] = useState(0);
    const Idparam = route.params;
    const [visible, setVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isCreditSale, setIsCreditSale] = useState(false);
    const [invoiceData, setInvoiceData] = useState('');
    const [viewInvoice, setViewInvoice] = useState(false);
    const [productList, setProductList] = useState([]);
    const toggleCreditSaleSwitch = () => setIsCreditSale(previousState => !previousState);
    const customerdetailsInputRef = createRef();
    const bankdetailsInputRef = createRef();
    const [userType, setUserType] = useState(0);
    useEffect(() => {
        setAmount(Idparam.amount)
        setOriginalAmount(Idparam.originalAmount)
        setDiscountValue(Idparam.discountValue)
        setDiscountApplied(Idparam.discountApplied)
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('businessName').then(value => {
                setBusinessName(value);

            });

        })
        AsyncStorage.getItem('subScriptionType').then(value => {
            setUserType(value)
            console.log('usert', value)
            if (parseInt(value) == 3) {
                if (Idparam.Listproducts) {
                    setProductList(Idparam.Listproducts)
                }
            }
        })
        AsyncStorage.getItem('id').then(value => {
            setLoading(true);
            setUserId(value)

            fetch(`http://bustle.ticketplanet.ng/GetAllBankAccountByName/${value}`, {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    setLoading(false);
                    setBankDetails(responseJson)
                }).catch(error => {
                    setLoading(false);
                });
        })
        return () => {
            setBankDetails([])
            unsubscribe
        }
    }, [navigation]);

    const addSalesInvoiceDetails = (data) => {
        let updatedata = {
            ...data, "userId": parseInt(userId),
            IsSalesDetails: isEnabled,
            CreditSales: isCreditSale,
            status: 'UnPaid',
            discountApplied: discountApplied,
            originalAmount: parseFloat(originalAmount == null ? 0 : originalAmount),
            discountValue: parseFloat(discountValue == null ? 0 : discountValue),
            Amount: parseFloat(amount)
        };
        setLoading(false);
        return AddSales(updatedata)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    Alert.alert('Success', responseJson.responseText)
                    //alert('WhatsApp Message sent')
                    ShareFile()

                } else {
                    setErrortext(responseJson.responseText);
                }
            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const sendInvoice = () => {
        Alert.alert("Response", "Do you want to share this Invoice?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        setErrortext('');
                        setLoading(true);
                        let dataToSend = { ...invoiceSalesDetails };
                        addSalesInvoiceDetails(dataToSend)
                        setLoading(false);
                    }
                },
                {
                    text: "No",
                    onPress: () => {
                        console.log("Cancel Pressed")
                    },
                    style: "cancel"
                }
            ]
        )

    }

    const ShareFile = async () => {
        try {
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
                let options = {
                    html: invoiceData,
                    fileName: 'Invoice',
                    directory: 'Download',
                };

                let file = await RNHTMLtoPDF.convert(options)
                console.log('file', file);
                Share.open({
                    title: "Invoice",
                    message: "Invoice",
                    url: `file:///${file.filePath}`,
                    subject: "Report",
                })
                //Alert.alert('Information', 'File downloaded sucessfully');
            } else {
                Alert.alert("permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }
    const GetBankDetails = (data) => {
        fetch(`http://bustle.ticketplanet.ng/GetAllBankAccountNameById/${userId}/${data.bankId}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setLoading(false);
                setAccountDetails(responseJson)


                setCustomerDetails(data.customerDetails)

                if (data.salesDetails)
                    setSalesDetails(data.salesDetails)
                // setInvoiceSalesDetails(data)
                let updatedata = {
                    salesDetails: data.salesDetails,
                    accountName: responseJson.accountName,
                    accountNo: responseJson.accountNo,
                    bankName: responseJson.bankName,
                    discountValue: parseFloat(discountValue == null ? 0 : discountValue),
                    discountApplied: discountApplied,
                    productList: productList,
                    originalAmount: parseFloat(originalAmount == null ? 0 : originalAmount),
                    Amount: parseFloat(amount),
                    "userId": parseInt(userId)
                }
                return GenerateInvoice(updatedata)
                    .then(responseJson => {
                        setLoading(false);
                        if (responseJson.responseCode == 0) {
                            setInvoiceData(responseJson.invoice)
                            setVisible(true);
                        } else {
                            Alert.alert('Failed', responseJson.responseText)
                        }
                    }).catch(error => {
                        setLoading(false);
                        console.error(error);
                    });




            }).catch(error => {
                setLoading(false);
                console.error(error);
            });
    }
    const handleSubmitPress = data => {
        GetBankDetails(data)


    };
    const toggleOverlay = (data) => {
        setVisible(false);
    };
    const closeModal = () => {
        setVisible(false);
    };
    const ModalValue = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignContent: 'center', borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Send Invoice</Text>
                </View>
                <View style={{ flex: 5 }}>
                    {/* <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <Text style={{ fontSize: 20, textTransform: 'capitalize' }}>{businessName}</Text>
                        <Text style={{ fontSize: 20, textTransform: 'capitalize' }}>{"Invoice"}</Text>
                    </View>
                    <View style={{ alignContent: 'flex-start', justifyContent: 'flex-start', marginBottom: 40 }}>
                        <Text style={{ fontSize: 20, textTransform: 'capitalize' }}>{customerDetails}</Text>
                    </View>
                    <View style={{ alignContent: 'flex-start', justifyContent: 'flex-start', marginBottom: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{salesDetails}-{amount}</Text>
                    </View>
                    <View style={{ alignContent: 'flex-start', marginBottom: 10, justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{"Please pay to"}:</Text>
                    </View>

                    <View style={{ alignContent: 'flex-start', marginBottom: 10, justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{"Account Name:"}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20 }}>{accountDetails.accountName}</Text>
                        </View>

                    </View>
                    <View style={{ alignContent: 'flex-start', marginBottom: 10, justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{"Account Number:"}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20 }}>{accountDetails.accountNo}</Text>
                        </View>

                    </View>
                    <View style={{ alignContent: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{"Bank:"}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20 }}>{accountDetails.bankName}</Text>
                        </View>

                    </View> */}
                    <WebView source={{ html: invoiceData }} />
                </View>
                <View >
                    <TouchableOpacity
                        onPress={() => sendInvoice()}
                        style={styles.buttonStyleModal}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.buttonTextStyle}>Send Invoice</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => toggleOverlay()}
                        style={styles.buttonStyleModal}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.buttonTextStyle}>CLOSE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <Loader loading={loading} />
            <Overlay isVisible={visible} fullScreen={true}
                style={{ flex: 1, flexDirection: 'column' }}
                onBackdropPress={closeModal}>
                {ModalValue()}
            </Overlay>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <KeyboardAvoidingView enabled>
                    {
                        parseInt(userType) == 3 ?
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Items</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Unit Price</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Quantity</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Total Amount</Text>
                                    </View>
                                </View>

                                {
                                    productList.map((value, index) => {
                                        return <View style={{ flexDirection: 'row', flex: 1 }} key={index}>
                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                <View style={{ flex: 1 }}>
                                                    <Text>{value.name}</Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Text>{value.price}</Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Text>{value.quantity ? value.quantity : 1}</Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Text>{value.price * (value.quantity ? value.quantity : 1)}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    })
                                }

                            </View> : null
                    }
                    <View style={styles.SectionStyle}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text>Add Sales Details</Text>
                            </View>
                            <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />

                            </View>

                        </View>

                    </View>
                    {isEnabled ?
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
                                        placeholder="Sales Details"
                                        placeholderTextColor="#8b9cb5"
                                        keyboardType="default"
                                        returnKeyType="next"
                                        onSubmitEditing={() =>
                                            customerdetailsInputRef.current && customerdetailsInputRef.current.focus()
                                        }
                                        blurOnSubmit={false}
                                    />
                                )}
                                name="salesDetails"
                                rules={{ required: true }}
                                defaultValue=""
                            />
                        </View>
                        : null}
                    {isEnabled ?
                        <View style={styles.ErrorSectionStyle}>
                            {errors.salesDetails && <Text style={styles.ErrorMesage}>Sales Details is required!</Text>}
                        </View> : null}

                    <View style={styles.SectionStyle}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text>Credit Sale</Text>
                            </View>
                            <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isCreditSale ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleCreditSaleSwitch}
                                    value={isCreditSale}
                                />
                            </View>

                        </View>

                    </View>
                    <View style={styles.SectionStyle}>
                        <Text>Invoice Amount: {amount}</Text>
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
                                    placeholder="Customer Details"
                                    placeholderTextColor="#8b9cb5"
                                    ref={customerdetailsInputRef}
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        bankdetailsInputRef.current && bankdetailsInputRef.current.focus()
                                    }

                                    blurOnSubmit={false}
                                />
                            )}
                            name="customerDetails"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.customerDetails && <Text style={styles.ErrorMesage}>Customer Details is required!</Text>}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (

                                <Picker
                                    selectedValue={value ? value.toString() : value}
                                    style={styles.inputStyle}
                                    ref={bankdetailsInputRef}
                                    onSubmitEditing={Keyboard.dismiss}
                                    onValueChange={(value, itemIndex) => value ? onChange(parseInt(value)) : onChange(value)}
                                >
                                    <Picker.Item label="-Select Bank Account-" value="" />

                                    {bankDetails.map((item, key) =>
                                        <Picker.Item label={item.bankAccountName} value={item.id.toString()} key={key} />
                                    )}
                                </Picker>

                            )}
                            name="bankId"
                            rules={{ required: true }}
                            defaultValue=""
                        />

                    </View>
                    <View style={styles.ErrorSectionStyle}>
                        {errors.bankId && <Text style={styles.ErrorMesage}>Bank is required!</Text>}
                    </View>
                    <View style={{ paddingRight: 40 }}>
                        <TouchableOpacity style={{ justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end' }} onPress={() => navigation.navigate('AddBankDetailsScreen')}>
                            <Text style={{ fontSize: 9, textDecorationLine: 'underline', color: 'blue' }}>Add New Bank Details</Text></TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmit(handleSubmitPress)}
                    >
                        <Text style={styles.buttonTextStyle}>{"VIEW INVOICE"}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}
export default SalesInvoiceScreen
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    SectionStyleDropdown: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10, flex: 1
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
    buttonStyleModal: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 10,
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
    , dropdowninputStyle: {
        flex: 1,
        width: '100%',
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    }
});
