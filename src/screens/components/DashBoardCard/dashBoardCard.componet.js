import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const DashBoardCard = ({children}) => {
  return (
    <View
      style={{
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 25,
        paddingHorizontal: 25,
        width: "45%",
        height: 166,
        marginVertical: 10,
        // marginHorizontal:10
      }}>
      {children}
    </View>
  );
};
