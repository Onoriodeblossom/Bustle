import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
export const HeaderComponent = (props) => {
    console.log('ddd', props)
    let details = props.item

    return (
        <View style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2 }}>
                    <Text>Sales</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text>Total</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text>Volume</Text>
                </View>

            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2 }}>

                </View>
                <View style={{ flex: 1 }}>
                    {details === undefined ? null :
                        <Text>{details.salesTotal}</Text>
                    }
                </View>
                <View style={{ flex: 1 }}>
                    {details === undefined ? null :
                        <Text>{details.salesVolume}</Text>
                    }
                </View>

            </View>
        </View>
    )
}
export default HeaderComponent;

