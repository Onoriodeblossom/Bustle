import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import { DashBoardCard } from './DashBoardCard/dashBoardCard.componet';

export const ExpenseProfitComponent = (props) => {

    let details = props.item

    let profitstyle = details !== undefined ?
        details.lossGainTag == 1 ? 'green' : details.lossGainTag == -1 ? 'red' : '' : ''

    const profitimage = details !== undefined ?
        details.lossGainTag == 1 ?
            <Image source={require('../../images/profit_image.png')} style={{ flex: 1, width: 5, height: 30 }} />

            : details.lossGainTag == -1 ? <Image
                source={require('../../images/loss_image.png')} style={{ flex: 1, width: 10, height: 30 }} /> : null : null

    return (
        <DashBoardCard >
{/* 
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2 }}>
                </View>
                <View style={{ flex: 1 }}>
                    <Text>Total</Text>
                </View>
            </View> */}

            <View style={{ flexDirection: 'column',height:112, marginTop: 10 }}>
                <View style={{  }}>
                    <Text style={{ color: 'black', fontSize: 15 }}>Weekly Expenses Rate</Text>
                </View>
                <View style={{  }}>
                    {
                        details === undefined ? null :
                            <View style={{
                            
            height: 80,
            justifyContent: 'center', 
                            }}>
                                <Text style={{ color: 'black', fontSize: 40, flex: 1 }}>{details.lossGain}%</Text>
                                {profitimage}
                            </View>
                    }
                </View>
            </View>
        </DashBoardCard>
    )
}
export default ExpenseProfitComponent;

