import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const InputNumberButton = ({ value, handleOnPress }) => {
    // const { value, handleOnPress } = props;
    return (
        <TouchableOpacity style={styles.container}
            onPress={handleOnPress}
        >
            <Text style={styles.text}> {value}</Text>
        </TouchableOpacity>
    )
}

export default InputNumberButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});
