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

export const ExpandableShopList = ({ item, onClickFunction, toggleOverlay }) => {

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
            {/*Header of the Expandable List Item*/}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onClickFunction}
                style={styles.header}>
                <Text style={styles.headerText}>
                    {item.category_name} ({item.numberInStock})
                </Text>


            </TouchableOpacity>
            <View
                style={{
                    height: layoutHeight,
                    overflow: 'hidden',
                }}>
                {/*Content under the header of the Expandable List Item*/}
                {
                    item != null ?
                        item.map((item, key) => (
                            <TouchableOpacity
                                key={key}
                                style={styles.content}
                            >
                                <Text style={styles.text}>
                                    {item.val} ({item.currentStock})
                        </Text>
                                <View style={styles.separator} />
                            </TouchableOpacity>
                        ))
                        : <></>
                }
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
        fontWeight: '500'
    },
    separator: {
        height: 0.5,
        backgroundColor: '#808080',
        width: '95%',
        marginLeft: 16,
        marginRight: 16,
    },
    text: {
        fontSize: 16,
        color: '#606070',
        padding: 10,
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
    },
});