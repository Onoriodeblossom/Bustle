import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
const Category = props => {
    const { active, item, index, handleSelection } = props;
    return (
        <TouchableOpacity key={index}
            disabled={active}
            index={index}
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => handleSelection(index)}>
            <Text style={styles.btnText}> {item.name} ({item.products.length})</Text>
        </TouchableOpacity>

    );
};

export default Category;
const styles = StyleSheet.create({

    button: {
        width: 100,
        marginTop: 10,
        backgroundColor: "green",
        padding: 15,
        borderRadius: 5,
    },
    btnText: {
        color: "white",
        fontSize: 10,
        justifyContent: "center",
        textAlign: "center",
    },
});