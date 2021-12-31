import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { clearProductFromCart } from "../../redux/actions/cart";
import { useDispatch } from 'react-redux'
export const ClearAppData = async function () {
    try {

        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
        console.log('cleared')
    } catch (error) {
        console.error('Error clearing app data.');
    }
}

export const ClearCart = async function () {

    const dispatch = useDispatch()
    dispatch(clearProductFromCart())
}