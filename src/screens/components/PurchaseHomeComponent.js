import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const PurchaseHomeComponent = (props) => {
    return (
        <TouchableOpacity style={styles.image} activeOpacity={0.8} onPress={() => props.SalesAction(props.Action)} >
            <View style={{
                flex: 1, alignContent: 'center',
                justifyContent: "center", alignItems: "center",
            }}>
                <Image source={props.imgUri}
                    style={{ width: 80, height: 80 }}
                />
                <Text style={{ fontSize: props.fontsize, fontWeight: 'bold' }}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PurchaseHomeComponent

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: wp('47%'),
        margin: 2,
        alignContent: 'center',
        justifyContent: "center", alignItems: "center",
        textAlign: 'center',
        alignSelf: 'stretch',
        borderRadius: 2,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.11,
        shadowRadius: 1.0,
        elevation: 1,
    },
    imagebackground: {
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        marginTop: 10,
        paddingBottom: 1,
        paddingLeft: 1,
        paddingRight: 1,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#fff',
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 5,
        color: '#ffffff',
        backgroundColor: 'transparent',
    }
});
