import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const LockedComponent = (props) => {
    return (

        <View style={{
            flex: 1, alignContent: 'center',
            justifyContent: "center", alignItems: "center",
        }}>
            <Image source={require('../../images/lock_menu.png')}
                style={{ width: 80, height: 80 }}
            />
        </View>
    )
}
export default LockedComponent