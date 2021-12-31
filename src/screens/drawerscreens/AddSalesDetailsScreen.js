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
import { AddSales } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import { connect, useDispatch } from "react-redux";
import { clearProductFromCart } from "../../redux/actions/cart";
const AddSalesDetailsScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [errortext, setErrortext] = useState('');
    const [amount, setAmount] = useState(0);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountValue, setDiscountValue] = useState(0);
    const [productList, setProductList] = useState([]);
    const [originalAmount, setOriginalAmount] = useState(0);
    const [userId, setUserId] = useState(0);
    const Idparam = route.params;
    const dispatch = useDispatch();
    const clearCart = () => dispatch(clearProductFromCart())
    const [isEnabled, setIsEnabled] = useState(false);
    const [sucessfullScreen, setSucessfullScreen] = useState(false);
    const [userType, setUserType] = useState(0);
    //const [productList, setProductList] = useState([]);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isCreditSale, setIsCreditSale] = useState(false);
    const toggleCreditSaleSwitch = () => setIsCreditSale(previousState => !previousState);
    const [checked, setChecked] = React.useState('POS');
    useEffect(() => {


        setAmount(Idparam.amount)
        setOriginalAmount(Idparam.originalAmount)
        setDiscountValue(Idparam.discountValue)
        setDiscountApplied(Idparam.discountApplied)
        // if (Idparam.discountApplied)
        //     setProductList(Idparam.Listproducts)
        AsyncStorage.getItem('id').then(value => {
            setUserId(value)

        })
        AsyncStorage.getItem('subScriptionType').then(value => {
            setUserType(value)
            if (parseInt(value) == 3) {
                if (Idparam.Listproducts) {
                    setProductList(Idparam.Listproducts)
                }
            }
        })
    }, []);

    const addSalesDetails = (data) => {
        var Currentdate = moment().format('MM-DD-YYYY')
        let updatedata = {
            ...data, "userId": parseInt(userId),
            IsSalesDetails: isEnabled,
            CreditSales: isCreditSale,
            Amount: parseFloat(amount),
            PaymentType: checked,
            discountApplied: discountApplied,
            discountValue: discountValue,
            originalAmount: parseFloat(originalAmount),
            registrationDate: Currentdate,
            subscriptionPlan: parseInt(userType),
            productList: parseInt(userType) == 3 ? productList : null
        };

        console.log('****', updatedata)
        return AddSales(updatedata)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.responseCode == 0) {
                    clearCart()
                    setSucessfullScreen(true)
                } else {
                    setErrortext(responseJson.responseText);
                }
            }).catch(error => {
                setLoading(false);
                console.error('erroe', error);
            });
    }
    const handleSubmitPress = data => {

        setErrortext('');
        setLoading(true);
        let dataToSend = { ...data };
        addSalesDetails(dataToSend)
    };
    if (sucessfullScreen) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../../images/confirmSale.png')}
                    style={{
                        height: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                    }}
                />
                <Text style={styles.successTextStyle}>Sales Successful</Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('SalesHomeScreen')}>
                    <Text style={styles.buttonTextStyle}>Continue</Text>
                </TouchableOpacity>
            </View>
        );
    }
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
                        <View style={styles.SectionStyleMultiline}>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        value={value}
                                        style={styles.inputStyleMultiline}
                                        onBlur={onBlur}
                                        multiline={true}
                                        numberOfLines={4}
                                        onChangeText={value => onChange(value)}
                                        underlineColorAndroid="#f000"
                                        placeholder="Sales Details"
                                        placeholderTextColor="#8b9cb5"
                                        keyboardType="default"
                                        returnKeyType="next"
                                        onSubmitEditing={Keyboard.dismiss}
                                        blurOnSubmit={false}
                                    />
                                )}
                                name="salesDetails"
                                rules={{ required: true }}
                                defaultValue=""
                            />
                        </View> : null}

                    <View style={styles.ErrorSectionStyle}>
                        {errors.salesDetails && <Text style={styles.ErrorMesage}>Sales Details is required!</Text>}
                    </View>
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
                        <Text style={{ fontWeight: 'bold' }}>Sales:</Text><Text> {amount}</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <RadioButton

                                    value="CASH"
                                    status={checked === 'CASH' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('CASH')}
                                />
                            </View>
                            <View style={{
                                flex: 1, alignContent: 'center', justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{ fontSize: 10 }}>Cash</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <RadioButton
                                    value="TRANSFER"
                                    status={checked === 'TRANSFER' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('TRANSFER')}
                                />
                            </View>
                            <View style={{
                                flex: 1, alignContent: 'center', justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{ fontSize: 10 }}>Transfer</Text>
                            </View>


                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <RadioButton

                                    value="POS"
                                    status={checked === 'POS' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('POS')}
                                />
                            </View>
                            <View style={{
                                flex: 1, alignContent: 'center', justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{ fontSize: 10 }}>POS</Text>
                            </View>
                        </View>
                        {
                            isCreditSale ?
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <RadioButton

                                            value="CREDIT"
                                            status={checked === 'CREDIT' ? 'checked' : 'unchecked'}
                                            onPress={() => setChecked('CREDIT')}
                                        />
                                    </View>
                                    <View style={{
                                        flex: 1, alignContent: 'center', justifyContent: 'center',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Text style={{ fontSize: 10 }}>CREDIT</Text>
                                    </View>
                                </View> : null
                        }
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
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onSubmitEditing={Keyboard.dismiss}
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

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmit(handleSubmitPress)}
                    >
                        <Text style={styles.buttonTextStyle}>{"SAVE"}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </ScrollView>
        </View>
    )
}
// const mapStateToProps = state => {
//     return {
//         products: state.products
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         clearProduct: () => dispatch(clearProductFromCart())
//     };
// };

export default connect(null, null
)(AddSalesDetailsScreen);
//export default AddSalesDetailsScreen
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    successTextStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    SectionStyleMultiline: {
        flexDirection: 'row',
        height: 80,
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
    },
    inputStyleMultiline: {
        flex: 1,
        color: 'black',
        borderWidth: 1,
        borderColor: '#dadae8',
    }

});
