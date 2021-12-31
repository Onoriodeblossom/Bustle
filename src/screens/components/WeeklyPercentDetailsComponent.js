import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';

export const WeeklyPercentDetailsComponent = (props) => {
    let details = props.item

    return (
        <View style={{ marginTop: 10, marginRight: 15 }}>
            {
                details ?
                    details.length > 0 ?
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: 'bold' }}>Top 5 selling products</Text>
                        </View>
                        : null
                    : null
            }
            <View style={{
                flexDirection: 'row',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }
            }>

                {
                    details ?
                        details.length > 0 ?
                            details.map((value, index) => {
                                return <View key={index}>
                                    <View style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        alignItems: 'center', height: 20
                                    }}>
                                        <Text
                                            style={styles.smallitem}
                                        >
                                            {value.variationName}
                                        </Text>
                                    </View>
                                </View>

                            }) : null : null
                }
            </View>

        </View>
    )
}
export default WeeklyPercentDetailsComponent;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },

    smallitem: {
        width: 90,
        padding: 3,
        fontSize: 10,
    },

});