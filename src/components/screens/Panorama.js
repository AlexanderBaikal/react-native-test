import React, {useRef, useState} from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {screens} from '../navigator/naviConsts';
import ColumnCard from '../columnCard/ColumnCard';
import MyCard from '../card/MyCard';

const Panorama = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate(screens.HOME_SCREEN);
  };

  const windowWidth = Dimensions.get('window').width;

  const [indicator, setIndicator] = useState(new Animated.Value(0));

  const [wholeWidth, setWholeWidth] = useState(1);

  const [visibleWidth, setVisibleWidth] = useState(0.2);

  const scrollRef = useRef(null);

  const indicatorSize =
    wholeWidth > visibleWidth
      ? (visibleWidth * visibleWidth) / wholeWidth
      : visibleWidth;

  const difference =
    visibleWidth > indicatorSize ? visibleWidth - indicatorSize : 1;

  // Pan responder

  const [scrollPos, setScrollPos] = useState(indicator);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: (e, gestureState) => {
        // indicator.setOffset(gestureState.moveX);
      },
      onPanResponderStart: (e, gestureState) => {
        console.log('START', indicator);
        setScrollPos(indicator);
      },
      onPanResponderMove: (e, gestureState) => {
        let shift = scrollPos._value + gestureState.dx * 0.2;

        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            x: shift,
            animated: false,
          });
        }
      },

      onPanResponderRelease: () => {
        indicator.flattenOffset();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Text>Go back</Text>
      </TouchableOpacity>
      <ScrollView
        ref={scrollRef}
        horizontal
        persistentScrollbar
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => {
          setWholeWidth(w);
        }}
        onLayout={evt => {
          setVisibleWidth(evt.nativeEvent.layout.width);
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: indicator}}}],
          {
            listener: event => {},
            useNativeDriver: false,
          },
        )}>
        <View
          style={[styles.columnContainer, {width: Math.floor(windowWidth)}]}>
          <ColumnCard>
            <MyCard title="First card header" text={'some text'} />
            <MyCard title="Second card header" text={'some text'} />
            <MyCard title="Third card header" text={'some text'} />
            <MyCard title="Third card header" text={'some text'} />
            <MyCard title="Third card header" text={'some text'} />
          </ColumnCard>
        </View>
        <View
          style={[styles.columnContainer, {width: Math.floor(windowWidth)}]}>
          <ColumnCard>
            <MyCard title="First card header" text={'some text'} />
            <MyCard title="Second card header" text={'some text'} />
            <MyCard title="Third card header" text={'some text'} />
          </ColumnCard>
        </View>
        <View
          style={[styles.columnContainer, {width: Math.floor(windowWidth)}]}>
          <ColumnCard>
            <MyCard title="First card header" text={'some text'} />
            <MyCard title="Second card header" text={'some text'} />
            <MyCard title="Third card header" text={'some text'} />
            <MyCard title="Third card header" text={'some text'} />
            <MyCard title="Third card header" text={'some text'} />
          </ColumnCard>
        </View>
      </ScrollView>

      <View style={styles.indicatorWrapper}>
        <Animated.View
          style={[
            styles.indicator,
            {
              width: indicatorSize,
              transform: [
                {
                  translateX: Animated.multiply(
                    indicator,
                    visibleWidth / wholeWidth,
                  ).interpolate({
                    inputRange: [0, difference],
                    outputRange: [0, difference],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  columnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    backgroundColor: '#bbbccc',
    height: 16,
  },
  indicatorWrapper: {
    height: 16,
  },
  contentContainer: {},
});

export default Panorama;
