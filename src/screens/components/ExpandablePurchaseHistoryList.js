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
    Image
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SubPurchaseHistoryList } from './SubHistory/SubPurchaseHistoryList';

export const ExpandablePurchaseHistoryList = ({ item, onClickFunction, toggleOverlay }) => {
    const [layoutHeight, setLayoutHeight] = useState(0);
    const [totalCredits, setTotalCredits] = useState(0);
    const [dailyexpense, setDailyexpense] = useState(item.dailyexpense);
    const [multiSelect, setMultiSelect] = useState(false);
    useEffect(() => {
        if (item.isExpanded) {
            setLayoutHeight(null);
        } else {
            setLayoutHeight(0);
        }
    }, [item.isExpanded]);

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    const updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...dailyexpense];
        if (multiSelect) {
            // If multiple select is enabled
            array[index]['isExpanded'] = !array[index]['isExpanded'];
        } else {
            // If single select is enabled
            array.map((value, placeindex) => placeindex === index
                ? (array[placeindex]['isExpanded'] =
                    !array[placeindex]['isExpanded'])
                : (array[placeindex]['isExpanded'] = false)
            );
        }
        setDailyexpense(array);
    };
    return (
        <View>
            {/*Header of the Expandable List Item*/}
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
                {/*Content under the header of the Expandable List Item*/}
                <View style={{ height: 40, flexDirection: 'row', marginBottom: 10 }}>
                    <View style={{ flex: 1, alignContent: 'flex-start', paddingLeft: 10, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Purchases</Text>
                        <Text style={{ fontWeight: 'bold' }}>{item.totalCount}</Text>
                    </View>
                    <View style={{
                        alignContent: 'flex-end', paddingRight: 10, alignItems: 'flex-end',
                        justifyContent: 'flex-end', flex: 1
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>Amount</Text>
                        <Text style={{ fontWeight: 'bold' }}>
                            {
                                item.totalAmount
                            }
                        </Text>
                    </View>
                </View>

                {
                    item.dailyexpense.map((val, key) => (
                        <SubPurchaseHistoryList
                            key={val.dateDescription}
                            onClickFunction={() => {
                                updateLayout(key);
                            }}
                            item={val}
                        />

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
    textheader: {
        flex: 1,
        backgroundColor: '#ECE5E4',
        fontSize: 7,
        fontWeight: '800'
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    separator: {
        height: 0.5,
        backgroundColor: '#808080',
        width: '100%'
    },
    text: {
        fontSize: 16,
        color: '#606070',
        padding: 10,
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff'
    },
});