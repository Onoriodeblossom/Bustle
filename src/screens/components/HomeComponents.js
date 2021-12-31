import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeComponents = (props) => {
    return (
        <View style={styles.image} >
            <View style={{
                flex: 1, alignContent: 'center',
                justifyContent: "center", alignItems: "center",
            }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{props.title}</Text>
                <Image source={props.imgUri}
                    style={{ width: 80, height: 80 }}
                />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}> {'\u20A6'}{props.Amount}</Text>
            </View>
        </View>
    )
}

export default HomeComponents

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: 170,
        height: 100,
        margin: 2,
        alignContent: 'center',
        justifyContent: "center", alignItems: "center",
        textAlign: 'center',
        alignSelf: 'stretch',
        borderRadius: 2,
        backgroundColor: 'transparent',
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
    paperBack: {
        top: -245,
        height: 200,
        backgroundColor: "red",
        minHeight: '100%',
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
