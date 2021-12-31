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
import AddSalesUserType1 from './AddSalesUserType1'
import AddSalesUserType2 from './AddSalesUserType2'

const AddSalesScreen = ({ navigation }) => {
    const [userType, setUserType] = useState(0)
    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('subScriptionType').then(value => {
                setUserType(value)
            });
        })
        return () => {
            setUserType('0')
            unsubscribe
        }

    }, [navigation]);
    return (
        <View style={styles.container}>
            {
                userType == "2" ?
                    <AddSalesUserType1 navigation={navigation} />
                    : userType == "3" ? <AddSalesUserType2 navigation={navigation} />
                        : null
            }
        </View>
    );
}
export default AddSalesScreen


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
    resultContaineruserType2: {
        flex: 1,
        fontSize: 9,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    inputContainer: {
        flex: 4,
        backgroundColor: '#3D0075'
    },
    inputContainer2: {
        flex: 4,
        backgroundColor: 'white'
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