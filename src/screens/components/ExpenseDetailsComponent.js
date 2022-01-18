import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ViewBase,
} from 'react-native';
import {DashBoardCard} from './DashBoardCard/dashBoardCard.componet';

export const ExpenseDetailsComponent = props => {
  let details = props.item;

  return (
    <View style={{marginTop: 10}}>
      {/* <View style={{flexDirection: 'row'}}>
        <View style={{flex: 2}}></View>
        <View style={{flex: 1}}>
          <Text>Total</Text>
        </View>
      </View> */}
      <DashBoardCard style={{flexDirection: 'row'}}>
        <View style={{flex: 2}}>
          <Text style={{color: 'red', fontSize: 15}}>Weekly Expenses</Text>
        </View>
        <View style={{flex: 1}}>
          {details === undefined ? null : (
            <Text style={{color: 'black', fontSize: 20}}>
              {'\u20A6'}
              {details.expenseAmount}
            </Text>
          )}
        </View>
      </DashBoardCard>
      <DashBoardCard style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{flex: 2, flexDirection: 'column'}}>
          <Text style={{color: 'red', fontSize: 10}}>Total Expenditure</Text>
          <Text style={{color: 'red', fontSize: 10}}>(COGS + Expenses)</Text>
        </View>
        <View style={{flex: 1}}>
          {details === undefined ? null : (
            <Text style={{color: 'black', fontSize: 20}}>
              {'\u20A6'}
              {details.expenditure}
            </Text>
          )}
        </View>
      </DashBoardCard>
    </View>
  );
};
export default ExpenseDetailsComponent;
