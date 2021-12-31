// Import React
import React, { useEffect, useState } from 'react';
// Import required components
import {
    SafeAreaView,
    LayoutAnimation,
    StyleSheet,
    View,
    Text,
    ScrollView,
    UIManager,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { SearchBar, CheckBox, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ExpandableInvoiceList = ({ item, onClickFunction, toggleOverlay, onEditFunction }) => {
    const [layoutHeight, setLayoutHeight] = useState(0);

    useEffect(() => {
        if (item.isExpanded) {
            setLayoutHeight(null);
        } else {
            setLayoutHeight(0);
        }
    }, [item.isExpanded]);

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onClickFunction}
                style={styles.header}>
                <Text style={styles.headerText}>
                    {item.dateDescription}
                </Text>
            </TouchableOpacity>
            <View
                style={{
                    height: layoutHeight,
                    overflow: 'hidden',
                    flex: 1
                }}>
                <View style={{ flex: 1, flexDirection: "row" }} >
                    <View style={{ flex: 2, backgroundColor: '#ECE5E4' }}>
                        <Text>customerDetails</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#ECE5E4' }}>
                        <Text>Amount</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#ECE5E4' }}>
                        <Text>Status</Text>
                    </View>
                    <View style={{ flex: 2, backgroundColor: '#ECE5E4' }}>
                        <Text style={{ marginLeft: 20 }}>Action?</Text>
                    </View>
                </View>
                {
                    item.salesDto.map((item, key) => (
                        <View
                            key={key}
                            style={styles.content}
                        >
                            <View style={{
                                flex: 1, flexDirection: "row", height: 40,
                                alignContent: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }} >
                                <View style={{ flex: 2 }}>
                                    <Text>{item.customerDetails}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>{item.amount}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 10 }}>{item.status}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => alert('Resend')}>
                                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                                            {'Resend'}</Text></TouchableOpacity>
                                </View>
                                <View style={{ flex: 1 }}>
                                    {item.status == 'UnPaid' || item.status == 'Paid' ?
                                        <TouchableOpacity onPress={() => onEditFunction(item.id)}>
                                            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                                                {'Edit'}</Text></TouchableOpacity>
                                        : null}
                                </View>
                            </View>
                            <View style={styles.separator} />
                        </View>
                    ))}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EDE8E7'
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    separator: {
        height: 0.5,
        backgroundColor: '#808080',
        width: '100%',
    },
    text: {
        fontSize: 16,
        color: '#606070',
        padding: 10,
    },
    content: {
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff'
    },
});