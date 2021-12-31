import React, { Component, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { connect } from "react-redux";
import { removeProductFromCart } from "../../redux/actions/cart";
import { Overlay } from 'react-native-elements';

const Cart = props => {
    const [visible, setVisible] = useState(false)

    const calculateTotal = (total, currentItem) =>
        parseFloat(total + currentItem.price * (currentItem.quantity || 1));

    const renderProduct = (product, index) => (
        <View key={index} style={{ flex: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <Text>{product.name} </Text>
            <Text> {product.currency}{product.price} </Text>
            <Text>{product.quantity}</Text>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={() => props.removeProduct(index)}
            >
                <Text style={styles.btnText}>Remove Item</Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: 'grey', marginTop: 5, width: '100%' }}></View>
        </View>
    );

    const emptyCart = () => {
        return (
            <Text>Cart is empty.</Text>
        )
    }

    const countItems = () =>
        props.products
            .reduce((acc, cur) => {
                return parseFloat(acc + (cur.quantity || 1));
            }, 0)
            .toFixed(0);

    return (

        <View style={{ flex: 1 }}>
            <Overlay isVisible={visible} fullScreen={true}
                onBackdropPress={() => setVisible(false)}>
                <View style={{ flex: 1 }}>

                    <View style={{ flex: 5 }}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{ flexGrow: 1 }} >
                                {props.products.length
                                    ? props.products.map(renderProduct)
                                    : emptyCart()}

                            </View>

                        </ScrollView>
                        <View style={{ alignContent: 'flex-end', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <Text>Total </Text>
                            <Text> {'\u20A6'}{props.products.reduce(calculateTotal, 0).toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                        >
                            <Text style={styles.buttonTextStyle}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Overlay>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.11,
                    shadowRadius: 1.0,
                    elevation: 1
                }}
                onPress={() => setVisible(true)}>
                <Text style={{ color: 'black' }} >Cart ({countItems()} items)</Text>
                <Text> {'\u20A6'}{props.products.reduce(calculateTotal, 0).toFixed(2)}</Text>
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
        removeProduct: index => dispatch(removeProductFromCart(index))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
const styles = StyleSheet.create({
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

});