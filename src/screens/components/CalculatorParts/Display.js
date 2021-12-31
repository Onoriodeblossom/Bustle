import React, { Component } from 'react'
import { View, SafeAreaView, Text, StyleSheet } from 'react-native'

const Display = (props) => (

    <View style={styles.container}>
        {console.log('props', props)}
        <SafeAreaView style={styles.safe}>
            <Text
                style={styles.display}
                adjustsFontSizeToFit
                numberOfLines={1}
            >{props.display}</Text>
            {/* {props.result !== '' &&
                <Text
                    style={styles.result}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >{props.result}</Text>
            } */}
        </SafeAreaView>
    </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: 24,
    },
    safe: {
        flex: 1,
        justifyContent: 'space-around',
    },
    display: {
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 40,
    },
    result: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 30,
    },
})

export default Display;