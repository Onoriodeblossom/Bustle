import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';

export const PurchaseDetailsComponent = (props) => {
    let details = props.item

    return (
        <View style={{ marginTop: 10 }}>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2 }}>
                </View>
                <View style={{ flex: 1 }}>
                    <Text>Total</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2 }}>
                    <Text style={{ color: '#F9BA71', fontSize: 15 }}>Weekly Purchases</Text>
                </View>
                <View style={{ flex: 1 }}>
                    {details === undefined ? null :
                        <Text style={{ color: 'black', fontSize: 20 }}>{'\u20A6'}{details.purchaseTotal}</Text>
                    }
                </View>
            </View>
        </View>
    )
}
export default PurchaseDetailsComponent;

