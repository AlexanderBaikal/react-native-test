import React, {useRef, useState} from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {screens} from '../../consts/consts';
import ColumnCard from '../columnCard/ColumnCard';
import MyCard from '../card/MyCard';

const Panorama = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate(screens.HOME_SCREEN);
  };

  const [scrollValue, setScrollValue] = useState(0);

  // const [scrollState, setScrollState] = useState({
  //   indicator: new Animated.Value(0),
  //   wholeHeight: 1,
  //   visibleHeight: 0,
  // });

  // const indicatorSize =
  //   scrollState.wholeHeight > scrollState.visibleHeight
  //     ? (scrollState.visibleHeight * scrollState.visibleHeight) /
  //       scrollState.wholeHeight
  //     : scrollState.visibleHeight;

  // const difference =
  //   this.state.visibleHeight > indicatorSize
  //     ? this.state.visibleHeight - indicatorSize
  //     : 1;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Text>Go back</Text>
      </TouchableOpacity>
      <View style={[styles.columnContainer, {left: -scrollValue}]}>
        <View style={styles.columnWrapper}>
          <ColumnCard>
            <MyCard title="First card header" text={'some text'} />
            <MyCard title="Second card header" text={'some text'} />
            <MyCard title="Third card header" text={'some text'} />
          </ColumnCard>
        </View>
        <View style={styles.columnWrapper}>
          <ColumnCard>
            <MyCard title="First card header" text={'some text'} />
            <MyCard title="Second card header" text={'some text'} />
            <MyCard title="Third card header" text={'some text'} />
          </ColumnCard>
        </View>
        <View style={styles.columnWrapper}>
          <ColumnCard>
            <MyCard title="First card header" text={'some text'} />
            <MyCard title="Second card header" text={'some text'} />
            <MyCard title="Third card header" text={'some text'} />
          </ColumnCard>
        </View>
      </View>
      <View
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={evt => true}
        onResponderMove={evt => {
          setScrollValue(evt.nativeEvent.pageX);
        }}
        style={[styles.scrollBar, {left: scrollValue}]}
      />

      {/* <Animated.View
        style={[
          styles.scrollBar,
          {
            transform: [
              {
                translateY: Animated.multiply(
                  this.state.indicator,
                  this.state.visibleHeight / this.state.wholeHeight,
                ).interpolate({
                  inputRange: [0, difference],
                  outputRange: [0, difference],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  mt5: {
    marginTop: 12,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '5%',
    height: '90%',
  },
  columnWrapper: {
    width: '100%',
  },
  scrollBar: {
    height: 16,
    width: '20%',
    backgroundColor: '#bbbccc',
  },
});

export default Panorama;
