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
    StatusBar
} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from "react-hook-form";
import { EditCategory } from '../utility/UserService'
import { AddCategory } from '../utility/UserService'
import AsyncStorage from '@react-native-community/async-storage';
import Row from "./Row";
import Button from "./Button";
import calculator, { initialState } from "./calculator";

const NewSalesTypeTwo = ({ route, navigation }) => {
    const state = initialState;
    const [currentState, setCurrentState] = useState({});

    const handleTap = (type, value) => {
        setCurrentState(state => calculator(type, value, state));
    };
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
                <Text style={styles.value}>
                    {parseFloat(currentState.currentValue).toLocaleString()}
                </Text>
                <Row>
                    <Button
                        text="C"
                        theme="secondary"
                        onPress={() => handleTap("clear")}
                    />
                    <Button
                        text="+/-"
                        theme="secondary"
                        onPress={() => handleTap("posneg")}
                    />
                    <Button
                        text="%"
                        theme="secondary"
                        onPress={() => handleTap("percentage")}
                    />
                    <Button
                        text="/"
                        theme="accent"
                        onPress={() => handleTap("operator", "/")}
                    />
                </Row>

                <Row>
                    <Button text="7" onPress={() => handleTap("number", 7)} />
                    <Button text="8" onPress={() => handleTap("number", 8)} />
                    <Button text="9" onPress={() => handleTap("number", 9)} />
                    <Button
                        text="x"
                        theme="accent"
                        onPress={() => handleTap("operator", "*")}
                    />
                </Row>

                <Row>
                    <Button text="4" onPress={() => handleTap("number", 4)} />
                    <Button text="5" onPress={() => handleTap("number", 5)} />
                    <Button text="6" onPress={() => handleTap("number", 6)} />
                    <Button
                        text="-"
                        theme="accent"
                        onPress={() => handleTap("operator", "-")}
                    />
                </Row>

                <Row>
                    <Button text="1" onPress={() => handleTap("number", 1)} />
                    <Button text="2" onPress={() => handleTap("number", 2)} />
                    <Button text="3" onPress={() => handleTap("number", 3)} />
                    <Button
                        text="+"
                        theme="accent"
                        onPress={() => handleTap("operator", "+")}
                    />
                </Row>

                <Row>
                    <Button
                        text="0"
                        size="double"
                        onPress={() => handleTap("number", 0)}
                    />
                    <Button text="." onPress={() => handleTap("number", ".")} />
                    <Button
                        text="="
                        theme="accent"
                        onPress={() => handleTap("equal")}
                    />
                </Row>
            </SafeAreaView>
        </View>
    );
}
export default NewSalesTypeTwo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202020",
        justifyContent: "flex-end"
    },
    value: {
        color: "#fff",
        fontSize: 40,
        textAlign: "right",
        marginRight: 20,
        marginBottom: 10
    }
});