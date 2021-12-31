import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';

export const SalesDetailsComponent = (props) => {
    console.log('===', props)
    let details = props.item
    let profitstyle = details !== undefined ?
        details.lossGainTag == 1 ? 'green' : details.lossGainTag == -1 ? 'red' : 'black' : 'black'

    const profitimage = details !== undefined ?
        details.lossGainTag == 1 ?
            <Image source={require('../../images/profit_image.png')} style={{ flex: 1, width: 5, height: 30 }} />

            : details.lossGainTag == -1 ? <Image
                source={require('../../images/loss_image.png')} style={{ flex: 1, width: 10, height: 30 }} /> : null : null

    return (
        <View >

            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2 }}>
                    <Text style={{ color: profitstyle, fontSize: 15 }}>Weekly Sales Growth</Text>
                </View>
                <View style={{ flex: 1 }}>
                    {details === undefined ? null :
                        <View style={{
                            borderWidth: 1, borderColor: profitstyle,
                            alignSelf: 'flex-start', flexDirection: 'row', width: 100
                        }}>
                            <Text style={{ color: 'black', fontSize: 20, flex: 1 }}>{details.lossGain}%</Text>
                            {profitimage}
                        </View>
                    }
                </View>


            </View>
        </View>
    )
}
export default SalesDetailsComponent;

