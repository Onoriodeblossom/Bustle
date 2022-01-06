import React from 'react';
import {View, ScrollView, FlatList, StyleSheet} from 'react-native';
import {Circle} from './CircleComponent';

export const Container = ({scrollable, children}) => {
  return scrollable ? (
    <View style={styles.mainScroll}>
      <ScrollView contentContainerStyle={styles.mainScrolling}>
      <Circle size={220} top={90} right={-120} background="#0292B7" />
      <Circle size={220} bottom={-10} left={-100} background="#FE8111" />
        {children}

      </ScrollView>
    </View>
  ) : (
    <View style={styles.main}>
      <Circle size={220} top={90} right={-120} background="#FF8210" />
      <Circle size={220} bottom={-10} left={-100} background="#0292B7" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,

    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainScroll: {
    flex: 1,

    // paddingRight: 10,
    // paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    // backgroundColor: 'green',
  },
  mainScrolling: {
    minWidth: '100%',
    // padding: 20,
    minHeight: '100%',

    // paddingRight: 10,
    // paddingLeft: 10,
    // backgroundColor: 'red',
  },
});
