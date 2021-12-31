import React, { Component, useState, useEffect } from 'react'
import { SafeAreaView, Text, View, StyleSheet, Platform, TouchableOpacity, LayoutAnimation, UIManager, SectionList, ScrollView } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { ProductData, CONTENT } from '../utility/StaticData'
import { SearchBar, CheckBox, Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';
import { ExpandableComponent } from '../components/ExpandableListView';
import AsyncStorage from '@react-native-community/async-storage';


const InventoryScreen = ({ navigation }) => {

    useEffect(async () => {
        AsyncStorage.getItem('id').then(value => {
            setUserId(value)
            setLoading(true);
            fetch(`http://bustle.ticketplanet.ng/GetInventoryList/${value}`, {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    setLoading(false);
                    setListDataSource(responseJson)
                }).catch(error => {
                    setLoading(false);
                    console.error(error);
                });
        });
    }, []);
    const toggleOverlay = (data) => {
        //console.log('****', data)
        setVariationDetails(data)
        setVisible(!visible);
    };
    const closeModal = () => {
        setVisible(!visible);
    };
    const [listDataSource, setListDataSource] = useState([]);
    const [multiSelect, setMultiSelect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [variationDetails, setVariationDetails] = useState({});
    const [userId, setUserId] = useState(0);
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...listDataSource];
        if (multiSelect) {
            // If multiple select is enabled
            array[index]['isExpanded'] = !array[index]['isExpanded'];
        } else {
            // If single select is enabled
            array.map((value, placeindex) =>
                placeindex === index
                    ? (array[placeindex]['isExpanded'] =
                        !array[placeindex]['isExpanded'])
                    : (array[placeindex]['isExpanded'] = false),
            );
        }
        setListDataSource(array);
    };
    const ModalValue = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 5 }}>
                    <View style={{ height: 30 }}></View>
                    <View style={{ flexDirection: 'row', height: 40, borderBottomWidth: 1, marginTop: 10 }}>
                        <View style={{ flex: 3, alignContent: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20 }}>Item</Text>
                        </View>
                        <View style={{ flex: 3, alignContent: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20 }}>Value</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                        <View style={{ flex: 3, alignContent: 'center', justifyContent: 'center' }}>
                            <Text>Purchase Price</Text>
                        </View>
                        <View style={{ flex: 3, alignContent: 'center', justifyContent: 'center' }}>
                            <Text>{variationDetails.purchasePrice}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                        <View style={{ flex: 3, alignContent: 'center', justifyContent: 'center' }}>
                            <Text>Selling Price</Text>
                        </View>
                        <View style={{ flex: 3, alignContent: 'center', justifyContent: 'center' }}>
                            <Text>{variationDetails.sellingPrice}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                        <View style={{ flex: 3, alignContent: 'center', justifyContent: 'center' }}>
                            <Text>Profit margin</Text>
                        </View>
                        <View style={{ flex: 3, alignContent: 'center', justifyContent: 'center' }}>
                            <Text>{variationDetails.profitMargin}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                        <View style={{ flex: 3, alignContent: 'center', justifyContent: 'center' }}>
                            <Text>Current Stock</Text>
                        </View>
                        <View style={{ flex: 3, alignContent: 'center', justifyContent: 'center' }}>
                            <Text>{variationDetails.currentStock}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', height: 40, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                        <View style={{ flex: 3, alignContent: 'center', justifyContent: 'center' }}>
                            <Text>Reorder Level</Text>
                        </View>
                        <View style={{ flex: 3, alignContent: 'center', justifyContent: 'center' }}>
                            <Text>{variationDetails.redorderLevel}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => toggleOverlay()}
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.buttonTextStyle}>CLOSE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Loader loading={loading} />
                <Overlay isVisible={visible} fullScreen={true}
                    style={{ flex: 1, flexDirection: 'column' }} onBackdropPress={closeModal}>
                    {variationDetails ? ModalValue() : null}
                </Overlay>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={styles.titleText}>Shopping List<Text style={{ fontStyle: 'italic', fontSize: 8 }}>(Click on items to view details)</Text></Text>
                </View>
                <ScrollView>
                    {listDataSource.map((item, key) => (
                        <ExpandableComponent
                            key={key}
                            toggleOverlay={toggleOverlay}
                            onClickFunction={() => {
                                updateLayout(key);
                            }}
                            item={item}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default InventoryScreen

const styles = StyleSheet.create({
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#F5FCFF',
    },
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    item: {
        paddingLeft: 20,
        paddingTop: 10,
        fontSize: 18
    },
    smallitem: {
        paddingLeft: 20,
        paddingTop: 5,
        fontSize: 10
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
    sectionHeaderStyle: {
        backgroundColor: '#307ecc',
        fontSize: 20,
        padding: 5,
        color: '#fff',
    }
});
