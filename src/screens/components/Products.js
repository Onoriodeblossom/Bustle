import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';
import { connect } from "react-redux";
import { categoriesFetchData } from "../../redux/actions/categories";
import Category from "./CategoryComponent";
import ProductVariant from "./ProductVariantComponent";
import AsyncStorage from '@react-native-community/async-storage';

const Products = props => {
    const [active, setActive] = useState(0);

    const handleSelection = e => {

        const index = parseInt(e, 10);
        setActive(index);
        // return setActive(index);
    };

    const isActive = index => {
        return index === active;
    };

    const renderCategory = (item, index) => (
        <Category
            key={index}
            active={isActive(index)}
            item={item}
            index={index}
            handleSelection={handleSelection}
        />
    );
    const renderProduct = (item, index) => <ProductVariant key={index} item={item} />;

    useEffect(() => {
        AsyncStorage.getItem('id').then(value => {
            props.fetchData(`http://bustle.ticketplanet.ng/GetAllCartProducts/${value}`);
        })
        return () => { };
    }, []);

    if (props.isLoading) return <View><Text>loading...</Text></View>;
    return (
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
            {/* {props.categories.map(renderCategory)} */}
            <View style={{ flex: 1, padding: 10 }}>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flexGrow: 1 }} >
                        {props.categories.map(renderCategory)}
                    </View>
                </ScrollView>

            </View>
            <View style={{ flex: 2 }}>
                <ScrollView contentContainerStyle={styles.photogrid}>

                    {props.categories[active]
                        ? props.categories[active].products.map(renderProduct)
                        : false}

                </ScrollView>
            </View>
            {/* <View style={{ flex: 1 }}></View> */}
            {/* <View>
                {props.categories[active]
                    ? props.categories[active].products.map(renderProduct)
                    : false}
            </View> */}
        </View>
    );
};

const mapStateToProps = state => {
    return {
        categories: state.categories,
        isLoading: state.categoriesIsLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(categoriesFetchData(url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Products);

const styles = StyleSheet.create({

    photogrid: {
        flex: 1,
        flexGrow: 1,
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

});