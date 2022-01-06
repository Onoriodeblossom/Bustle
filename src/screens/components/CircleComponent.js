import React from 'react';
import {View, StyleSheet} from 'react-native';

export const Circle = ({...props}) => {
  return <View style={styles(props).circle}></View>;
};

const styles = props =>
  StyleSheet.create({
    circle: {
      width: props.size ? props.size : 70,
      height: props.size ? props.size : 70,
      backgroundColor: props.background ? props.background : 'green',
      // backgroundColor:"red",
      position: 'absolute',
      borderRadius: props.size ? props.size : 70,
      top: props.top ? props.top : "auto",
      right: props.right ? props.right : "auto",
      bottom: props.bottom ? props.bottom : "auto",
      left: props.left ? props.left : "auto",
      zIndex: 0,
    },
  });
