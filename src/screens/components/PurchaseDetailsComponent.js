import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {DashBoardCard} from './DashBoardCard/dashBoardCard.componet';

export const PurchaseDetailsComponent = props => {
  let details = props.item;

  return (
    <DashBoardCard>
      <View style={{flexDirection: 'row'}}></View>
      <View style={{}}>
        <View style={{}}>
          <Text style={{color: '#F9BA71', fontSize: 15}}>Weekly Purchases</Text>
        </View>
        <View
          style={{
            height: 80,
            justifyContent: 'center',
          }}>
          {details === undefined ? null : (
            <Text style={{color:'#AD9C00',fontSize: 40}}>
              {'\u20A6'}
              {details.purchaseTotal}
            </Text>
          )}
        </View>
      </View>
    </DashBoardCard>
  );
};
export default PurchaseDetailsComponent;
