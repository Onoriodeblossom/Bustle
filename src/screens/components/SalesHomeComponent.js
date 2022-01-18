import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LeftIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RightIcon from 'react-native-vector-icons/MaterialIcons';

const SalesHomeComponent = props => {
  return (
    <TouchableOpacity
      style={styles.CardContainer}
      activeOpacity={0.8}
      onPress={() => props.SalesAction(props.Action)}>
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height:"auto"
        }}>
        <View style={styles.LeftIconContainer}>
          <LeftIcon name={props.leftIconName} color="#0491B7" size={25} />
        </View>

        <View style={styles.CardTextContainer}>
          <Text style={{fontSize: 14}}>
            {props.title}
          </Text>
        </View>
        <View style={styles.RightIconContainer}>
          <RightIcon name={props.rightIconName} color="#130F26" size={25} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SalesHomeComponent;

const styles = StyleSheet.create({
  CardContainer: {
    // flex: 1,
    width: "95%",
    height:"auto",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingVertical:20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.11,
    shadowRadius: 1.0,
    elevation: 5,
  },


  buttonText: {
    marginTop: 10,
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#fff',
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 5,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  LeftIconContainer: {
    width: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:"auto"
  },
  CardTextContainer: {
    width: '70%',
  },
  RightIconContainer: {
    width: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
