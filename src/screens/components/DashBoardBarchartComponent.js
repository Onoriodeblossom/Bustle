import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
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
export const BarChartComponent = (props) => {
    let details = props.item;
    return (
        <View>
            {details === undefined ? null :
                <BarChart
                    data={{
                        labels: details.salesWeekDays,
                        datasets: [
                            {
                                data: details.salesAmout
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 30}
                    height={220}
                    yAxisLabel={'N'}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 30,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 30
                    }}
                />
            }
        </View>
    );
};
export default BarChartComponent;