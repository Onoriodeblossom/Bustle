import React, { createRef, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    TouchableOpacity
} from 'react-native'
import Loader from '../components/Loader';
import { Picker } from '@react-native-picker/picker';
import ToggleSwitch from 'toggle-switch-react-native'

const AddShoppingListScreen = ({ navigation }) => {
    const [stockName, setStockName] = useState('');
    const [stockDesc, setStockDesc] = useState('');
    const [buyingPrice, setBuyingPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [loading, setLoading] = useState(false);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const stockDescInputRef = createRef();
    const buyingPriceInputRef = createRef();
    const quantityInputRef = createRef();

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
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={StockName => setStockName(StockName)}
                            underlineColorAndroid="#f000"
                            placeholder="Stock Name"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="default"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                stockDescInputRef.current && stockDescInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={StockDesc => setStockDesc(StockDesc)}
                            underlineColorAndroid="#f000"
                            placeholder="Stock Desc"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="default"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                buyingPriceInputRef.current && buyingPriceInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={BuyingPrice => setBuyingPrice(BuyingPrice)}
                            underlineColorAndroid="#f000"
                            placeholder="Buying Price"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="numeric"
                            ref={buyingPriceInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                quantityInputRef.current && quantityInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={Quantity => setQuantity(Quantity)}
                            underlineColorAndroid="#f000"
                            placeholder="Quantity"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="numeric"
                            ref={quantityInputRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <ToggleSwitch
                            isOn={isEnabled}
                            onColor="green"
                            offColor="#BDBEC0"
                            label="Status"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="medium"
                            onToggle={isOn => setIsEnabled(isOn)}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.buttonTextStyle}>CREATE</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </ScrollView>
        </View>
    )
}
export default AddShoppingListScreen
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
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
