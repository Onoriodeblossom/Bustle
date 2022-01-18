import React from 'react';
import {View, ScrollView, FlatList, StyleSheet} from 'react-native';
import {Circle} from './CircleComponent';

export const Container = ({
  scrollable,
  children,
  backgroundFirst,
  topFirst,
  bottomFirst,
  rightFirst,
  leftFirst,
  sizeFirst,
  backgroundSecond,
  topSecond,
  bottomSecond,
  rightSecond,
  leftSecond,
  sizeSecond,
}) => {
  return scrollable ? (
    <View style={styles.mainScroll}>
      <ScrollView contentContainerStyle={styles.mainScrolling}>
        <Circle
          size={20}
          // top={90}
          // right={-120}
          // background="blue"
          // background="#0292B7"
          // background={backgroundFirst}
          top={topFirst}
          bottom={bottomFirst}
          right={rightFirst}
          left={leftFirst}
          size={sizeFirst}
        />
        <Circle
          size={80}
          // bottom={-10}
          // left={-100}
          // background="#FE8111"
          background={backgroundSecond}
          top={topSecond}
          bottom={bottomSecond}
          right={rightSecond}
          left={leftSecond}
          size={sizeSecond}
        />
        {children}
      </ScrollView>
    </View>
  ) : (
    <View style={styles.main}>
      <Circle
        size={220}
        top={90}
        right={-120}
        background="#FF8210"
        // background={backgroundFirst}
        top={topFirst}
        bottom={bottomFirst}
        right={rightFirst}
        left={leftFirst}
        size={sizeFirst}
      />
      <Circle
        size={220}
        bottom={-10}
        left={-100}
        background="#0292B7"
        // background={backgroundSecond}
        top={topSecond}
        bottom={bottomSecond}
        right={rightSecond}
        left={leftSecond}
        size={sizeSecond}
      />
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    backgroundColor: 'white',
  },
  mainScrolling: {
    minWidth: '100%',
    minHeight: '100%',
    backgroundColor: 'white',
  },
});
