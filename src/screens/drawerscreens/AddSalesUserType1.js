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
import Display from '../components/CalculatorParts/Display'
import Buttons from '../components/CalculatorParts/Buttons'

const AddSalesUserType1 = ({ navigation }) => {
    useEffect(async () => {
        AsyncStorage.getItem('id').then(value => {
            LoadDiscount(value)
        });
    }, []);

    const [displayValue, setDisplayValue] = useState('');
    const [resultValue, setResultValue] = useState('');
    const [userType, setUserType] = useState(2);
    const [operator, setOperator] = useState(null);
    const [firstValue, setFirstValue] = useState('');
    const [secondValue, setSecondValue] = useState('');
    const [discountRate, setDiscountRate] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountValue, setDiscountValue] = useState(0);
    const [originalAmount, setOriginalAmount] = useState(0);
    const [discountedAmount, setDiscountedAmount] = useState(0);
    const [nextValue, setNextValue] = useState(false);
    const [visible, setVisible] = useState(false);
    const [discountList, setDiscountList] = useState([]);

    const handleInput = operation => {

        if (operation === 'C') {
            setDisplayValue('')
            setResultValue('')
        }
        else if (operation === '=') {
            setDisplayValue(resultValue)
            //setResultValue('')
        }
        else {
            const display = displayValue + operation
            let result = resultValue
            try {

                let fixedOperation = display.split('×').join('*')
                fixedOperation = fixedOperation.split('÷').join('/')
                fixedOperation = fixedOperation.split(',').join('.')

                result = new String(eval(fixedOperation)).toString()

            } catch (e) { }

            setDisplayValue(display)
            setResultValue(result)
        }
    }
    const LoadDiscount = (value) => {
        fetch(`http://bustle.ticketplanet.ng/GetDiscount/${value}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
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
        let inputAmount = displayValue
        //setDiscountRate(discountRate.rate)
        setDiscountApplied(true)
        setDiscountValue(discountRate.rate)
        setOriginalAmount(inputAmount)


        let discountedAmount = 0;

        if (discountRate.discountType == 'AMOUNT') {
            discountedAmount = parseFloat(inputAmount) - parseFloat(discountRate.rate);
        } else {
            discountedAmount = (parseFloat(discountRate.rate) / 100) * parseFloat(inputAmount);
            // discountedAmount = parseFloat(inputAmount) - discountedAmount
        }
        setDiscountedAmount(discountedAmount)
        let amount_payable = parseFloat(inputAmount) - parseFloat(discountedAmount)
        //let discountedAmount = (parseFloat(discountRate.rate) / 100) * parseFloat(inputAmount ? inputAmount : 0);
        setDisplayValue(amount_payable);

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
    return (
        <View style={styles.container}>
            <Overlay isVisible={visible} fullScreen={true}
                style={{ flex: 1, flexDirection: 'column' }} onBackdropPress={closeModal}>
                {ModalValue()}
            </Overlay>
            <View style={styles.resultContainer}>
                <Display display={displayValue} result={resultValue} />
            </View>
            <View style={styles.inputContainer}>
                <Buttons operation={handleInput} />
            </View>
            <View style={styles.footerContainer}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ flex: 1, padding: 5 }}>
                        <TouchableOpacity
                            style={styles.buttonfooterStyle}
                            activeOpacity={0.5}
                            onPress={() => {
                                if (displayValue == '' || displayValue == '0') {
                                    alert('Make a calculation')
                                    return;
                                }
                                navigation.navigate('AddSalesDetailsScreen',
                                    {
                                        amount: displayValue, originalAmount: originalAmount,
                                        discountApplied: discountApplied,
                                        discountValue: discountedAmount
                                    })
                            }

                            }
                        >
                            <Text style={styles.buttonfooterTextStyle}>Proceed</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, padding: 5 }}>
                        <TouchableOpacity
                            style={styles.buttonfooterStyle}
                            activeOpacity={0.5}
                            onPress={() => {
                                if (displayValue == '' || displayValue == '0') {
                                    alert('Make a calculation')
                                    return;
                                }
                                setVisible(true)
                            }

                            }
                        >
                            <Text style={styles.buttonfooterTextStyle}>Add Discount</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, padding: 5 }}>
                        <TouchableOpacity
                            style={styles.buttonfooterStyle}
                            activeOpacity={0.5}
                            onPress={() => {
                                if (displayValue == '' || displayValue == '0') {
                                    alert('Calculate your sales')
                                    return;
                                }
                                navigation.navigate('SalesInvoiceScreen',
                                    {
                                        amount: displayValue, originalAmount: originalAmount,
                                        discountApplied: discountApplied,
                                        discountValue: discountedAmount
                                    })
                            }
                            }
                        >
                            <Text style={styles.buttonfooterTextStyle}>Issue invoice</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>);
}

export default AddSalesUserType1


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202020"
    },
    resultContainer: {
        flex: 1,
        fontSize: 9,
        justifyContent: 'center',
        backgroundColor: '#1E1240'
    },
    inputContainer: {
        flex: 4,
        backgroundColor: '#3D0075'
    },
    footerContainer: {
        flex: 2,
        backgroundColor: '#ffffff'
    },
    resultText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'right'
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