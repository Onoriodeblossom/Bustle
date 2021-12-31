import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { connect } from "react-redux";
import { addProductToCart } from "../../redux/actions/cart";

const ProductVariant = props => {
    const { item } = props;
    return (
        <View style={styles.imagewrap}>
            <Text style={{ fontSize: 9 }}>{item.name}</Text>
            <Text style={{ fontSize: 9 }}>{item.currency}{item.price}</Text>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={() => props.addProduct(item)}>
                <Text style={styles.btnText}>Add to cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = state => {
    return {
        products: state.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addProduct: product => dispatch(addProductToCart(product))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductVariant);
const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 30,
        marginTop: 10,
        backgroundColor: "green",
        borderRadius: 5,
        padding: 10
    },
    btnText: {
        color: "white",
        fontSize: 7,
        justifyContent: "center",
        textAlign: "center",
    },
    photogrid: {
        flex: 1,
        padding: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imagewrap: {
        padding: 5,
        borderWidth: 0.1,
        height: 100,
        width: (200 / 2) - 2,
        alignSelf: 'stretch',
        borderRadius: 1,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.11,
        shadowRadius: 1.0,
        elevation: 1,
        alignContent: 'center',
        justifyContent: "center", alignItems: "center",
        textAlign: 'center',
    }
});