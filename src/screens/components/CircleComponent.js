import React from 'react';
import {View, StyleSheet} from 'react-native';

export const Circle = ({...props}) => {
  return (
    <View
      style={styles(props).circle}
      top={styles(props).top}
      bottom={styles(props).bottom}
      right={styles(props).right}
      left={styles(props).left}
      background={styles(props).background}
      size={styles(props).size}
    />
  );
};

const styles = props =>
  StyleSheet.create({
    circle: {
      width: props.size ? props.size : 250,
      height: props.size ? props.size : 250,
      // backgroundColor: props.background ? props.background : 'green',
      // backgroundColor:"red",
      position: 'absolute',
      borderRadius: props.size ? props.size : 180,
      top: props.top ? props.top : 55,
      // right: props.right ? props.right : 1990,
      bottom: props.bottom ? props.bottom : '10',
      // left: props.left ? props.left : 690,
      zIndex: 0,
    },
  });
