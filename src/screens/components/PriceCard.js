import React, { Component } from 'react';
import { StyleSheet, Platform, View, Text, TouchableOpacity, Alert, Image } from 'react-native';

export class PriceCard extends Component {
    render() {
        return (
            <View style={styles.priceCard_Container}>
                <Text style={[styles.title, { color: this.props.titleColor }]}> {this.props.title} </Text>
                <Text style={[styles.price, { color: this.props.priceColor }]}> {this.props.price} </Text>
                {this.props.info.map(item => (
                    <Text
                        key={item}
                        style={styles.price_Info}
                    >
                        {item}
                    </Text>
                ))}
                <TouchableOpacity onPress={() => this.props.onButtonPress(this.props.userType)} activeOpacity={0.4}
                    style={styles.price_Button} >
                    <Image
                        source={{ uri: this.props.iconURL }}
                        style={styles.iconStyle} />
                    <Text style={styles.TextStyle}> {this.props.button_title} </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default PriceCard
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceCard_Container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#78909C',
        backgroundColor: '#fff',
        padding: 15
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black'
    },
    price: {
        fontSize: 29,
        fontWeight: 'bold',
    },
    price_Info: {
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
        color: 'black'
    },
    price_Button: {
        width: '90%',
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: '#0020C4',
        borderRadius: 4,
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    iconStyle: {
        width: 25,
        height: 25,
        justifyContent: 'flex-start',
        alignItems: 'center',
        tintColor: '#fff'
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15
    }
});
