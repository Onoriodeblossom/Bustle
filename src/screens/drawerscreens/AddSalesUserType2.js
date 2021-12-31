import React, { createRef, useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    Image,
    Switch,
    TouchableOpacity,
    StatusBar,
    FlatList
} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller, set } from "react-hook-form";
import { EditCategory } from '../utility/UserService'
import { AddCategory } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';
import InputNumberButton from '../components/InputNumberButton'
import calculator, { initialState } from "../components/calculator";
import { SearchBar, CheckBox, Button, Overlay } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { CustomerList } from '../utility/StaticData';
import Products from '../components/Products';
import Cart from '../components/Cart';
import { useSelector, useStore } from 'react-redux'

const AddSalesUserType2 = ({ navigation }) => {
    const store = useStore()

    const Listproducts = useSelector(state => state.products)

    useEffect(async () => {
        AsyncStorage.getItem('id').then(value => {
            LoadDiscount(value)

        });
    }, []);

    const [displayValue, setDisplayValue] = useState('0');
    const [payableAmount, setPayableAmount] = useState('0');
    const [endSale, setEndSale] = useState(false);
    const [discountedAmount, setDiscountedAmount] = useState(0);
    const [discountRate, setDiscountRate] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountValue, setDiscountValue] = useState(0);
    const [discountType, setDiscountType] = useState('');
    const [originalAmount, setOriginalAmount] = useState(0);
    // const [nextValue, setNextValue] = useState(false);
    const [visible, setVisible] = useState(false);
    const [discountList, setDiscountList] = useState([]);

    const LoadDiscount = (value) => {
        fetch(`http://bustle.ticketplanet.ng/GetDiscount/${value}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                setDiscountList(responseJson)
            }).catch(error => {
                console.error(error);
            });
    }
    const ItemView = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                height: 70,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            }
            }>
                <View style={{
                    flex: 1,
                    alignContent: 'flex-start',
                    width: 200, alignItems: 'flex-start'
                }}>
                    <Text
                        style={styles.item}
                    >
                        {item.discountName}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    alignContent: 'flex-start',
                    width: 200, alignItems: 'flex-start'
                }}>

                    <Text
                        style={styles.item}
                    >
                        <Text style={{ fontSize: 10, fontStyle: 'italic', fontWeight: 'bold' }} >
                            ({item.discountType == 'AMOUNT' ? '\u20A6' : '%'})
                            </Text>
                        {item.rate}

                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'flex-end',
                    alignItems: 'flex-end',
                    padding: 15
                }}>

                    <View style={{ flex: 1, marginLeft: 5 }}>

                        <RadioButton

                            value={item.id}
                            status={item.id === selectedIndex ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setSelectedIndex(item.id)
                                setDiscountRate(item)

                            }}
                        />
                    </View>


                </View>
            </View>

        );
    };
    const ApplyDiscount = () => {
        let inputAmount = Listproducts.reduce(calculateTotal, 0).toFixed(2)
        //setDiscountRate(discountRate.rate)
        setDiscountApplied(true)
        setDiscountValue(discountRate.rate)
        setDiscountType(discountRate.discountType)

        let discountedAmount = 0;

        if (discountRate.discountType == 'AMOUNT') {
            discountedAmount = parseFloat(discountRate.rate);
        } else {
            discountedAmount = (parseFloat(discountRate.rate) / 100) * parseFloat(inputAmount);
            // discountedAmount = parseFloat(inputAmount) - discountedAmount
        }
        setDiscountedAmount(discountedAmount)
        let amount_payable = parseFloat(inputAmount) - parseFloat(discountedAmount)
        setPayableAmount(amount_payable);

        setVisible(false)
    }
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
    const toggleOverlay = (data) => {
        setVisible(!visible);
    };
    const closeModal = () => {
        setVisible(!visible);
    };
    const ModalValue = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 5 }}>
                    <View style={{ height: 30 }}></View>
                    <FlatList
                        data={discountList}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View>
                        <TouchableOpacity
                            onPress={() => ApplyDiscount()}
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                        >
                            <Text style={styles.buttonTextStyle}>APPLY</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => toggleOverlay()}
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.buttonTextStyle}>CLOSE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    const EndSale = () => {
        if (!endSale)
            ClearDiscount()
        setEndSale(!endSale)

    }
    const ClearDiscount = () => {
        setDiscountApplied(false)
        setDiscountRate(0)
        setOriginalAmount(0)
        setDisplayValue(0)
        setDiscountedAmount(0)
        setSelectedIndex(0)
        setPayableAmount(0)

    }
    const calculateTotal = (total, currentItem) =>
        parseFloat(total + currentItem.price * (currentItem.quantity || 1));

    return (
        <View style={styles.container}>
            <Overlay isVisible={visible} fullScreen={true}
                style={{ flex: 1, flexDirection: 'column' }} onBackdropPress={closeModal}>
                {ModalValue()}
            </Overlay>
            <View style={styles.resultContainer}>
                <View style={{ flex: 1, paddingLeft: 20 }}>
                    <TouchableOpacity
                        onPress={() => EndSale()}
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.buttonTextStyle}>{endSale ? 'CONTINUE SALES' : 'END SALES'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, paddingRight: 20, alignContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <Cart />
                </View>
            </View>
            <View style={styles.inputContainer}>
                {!endSale ?
                    <Products />
                    : null}
            </View>
            {endSale ?
                <View style={styles.footerContainer}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1, padding: 5 }}>
                            <TouchableOpacity
                                style={styles.buttonfooterStyle}
                                activeOpacity={0.5}
                                onPress={() => {
                                    console.log('Listproducts', Listproducts)
                                    if (Listproducts.length > 0) {

                                        let amount_value = Listproducts.reduce(calculateTotal, 0).toFixed(2)
                                        if (discountApplied) {
                                            amount_value = payableAmount.toFixed(2)

                                        }

                                        setOriginalAmount(Listproducts.reduce(calculateTotal, 0).toFixed(2))
                                        navigation.navigate('AddSalesDetailsScreen',
                                            {
                                                amount: amount_value, originalAmount:
                                                    Listproducts.reduce(calculateTotal, 0).toFixed(2),
                                                discountApplied: discountApplied,
                                                discountValue: discountedAmount,
                                                Listproducts: Listproducts
                                            })
                                    } else {
                                        alert('Add Items to your basket')
                                    }
                                }}>
                                <Text style={styles.buttonfooterTextStyle}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, padding: 5 }}>
                            <TouchableOpacity
                                style={styles.buttonfooterStyle}
                                activeOpacity={0.5}
                                onPress={() => {
                                    if (Listproducts.length > 0) {
                                        setDisplayValue(Listproducts.reduce(calculateTotal, 0).toFixed(2));
                                        setOriginalAmount(Listproducts.reduce(calculateTotal, 0).toFixed(2))
                                        if (!discountApplied)
                                            setVisible(true)
                                        else {
                                            alert('Discount already exist. Clear it first before applying another.')
                                            return
                                        }
                                    } else {
                                        alert('Add Items to your basket')
                                    }
                                }}
                            >
                                <Text style={styles.buttonfooterTextStyle}>Add Discount</Text>


                            </TouchableOpacity>
                            {discountApplied ?
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 7 }}>Discount Value</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 7 }}>New Value</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 7 }}> {'\u20A6'}{discountedAmount}</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 7 }}> {'\u20A6'}{payableAmount.toFixed(2)}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, marginTop: 5 }}>
                                        <TouchableOpacity
                                            style={styles.buttonfooterStyle}
                                            onPress={() => ClearDiscount()}
                                            activeOpacity={0.5}>
                                            <Text style={styles.buttonfooterTextStyle}>Clear Discount</Text>


                                        </TouchableOpacity>
                                    </View>
                                </View> : null}

                        </View>
                        <View style={{ flex: 1, padding: 5 }}>
                            <TouchableOpacity
                                style={styles.buttonfooterStyle}
                                activeOpacity={0.5}
                                onPress={() => {
                                    if (Listproducts.length > 0) {
                                        let amount_value = Listproducts.reduce(calculateTotal, 0).toFixed(2)
                                        if (discountApplied) {
                                            amount_value = payableAmount.toFixed(2)
                                        }

                                        // setOriginalAmount(Listproducts.reduce(calculateTotal, 0).toFixed(2))
                                        navigation.navigate('SalesInvoiceScreen',
                                            {
                                                amount: amount_value, originalAmount: Listproducts.reduce(calculateTotal, 0).toFixed(2),
                                                discountApplied: discountApplied,
                                                discountValue: discountedAmount,
                                                Listproducts: Listproducts
                                            })
                                    } else {
                                        alert('Add Items to your basket')
                                    }
                                }}
                            >
                                <Text style={styles.buttonfooterTextStyle}>Issue invoice</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : null}
        </View>
    );
}
export default AddSalesUserType2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202020"
    },
    resultContainer: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 9,
        backgroundColor: 'white'
    },
    inputContainer: {
        flex: 6,
        backgroundColor: 'white'
    },
    footerContainer: {
        flex: 3,
        backgroundColor: '#ffffff'
    },
    resultText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        padding: 20
    },
    inputRow: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonfooterStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 10
    },
    buttonfooterTextStyle: {
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
        marginBottom: 5,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
});