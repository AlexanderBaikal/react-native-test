import React, {useContext, useRef, useState} from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import MyColumn from '../elements/MyColumn';
import Context from '../../Context';
import {IColumn} from '../../interfaces';

const Panorama = () => {
  const windowWidth = Dimensions.get('window').width;
  const [indicator, _] = useState(new Animated.Value(0));
  const [wholeWidth, setWholeWidth] = useState(1);
  const [visibleWidth, setVisibleWidth] = useState(0.2);
  const [activeCard, setActiveCard] = useState(-1);
  const [activeColumn, setActiveColumn] = useState(-1);
  const [dropColumn, setDropColumn] = useState(-1);

  const {
    cardItems,
    moveCard,
    changeText,
    setScreenValue,
    addCard,
    setSelectedCol,
    selectedCol,
  } = useContext(Context);

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
        //
      },
      onPanResponderStart: (e, gestureState) => {
        setScrollPos(indicator);
      },
      onPanResponderMove: (e, gestureState) => {
        // @ts-ignore
        let shift = scrollPos._value + gestureState.dx * 0.2;

        if (scrollRef.current) {
          // @ts-ignore
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

  const contextColumn = {
    windowWidth,
    activeCard,
    dropColumn,
    moveCard,
    changeText,
    setActiveCard,
    setActiveColumn,
    setDropColumn,
    setScreenValue,
    addCard,
    setSelectedCol,
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        contentOffset={{x: windowWidth * selectedCol, y: 0}}
        horizontal
        persistentScrollbar
        pagingEnabled
        scrollEnabled={activeCard === -1}
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
        {cardItems.map((column: IColumn, columnId: number) => (
          <View
            key={column.title}
            style={[
              styles.columnContainer,
              {
                width: windowWidth,
                zIndex: activeColumn === columnId ? 10 : 1,
              },
            ]}>
            <Context.Provider value={contextColumn}>
              <MyColumn
                items={column.cards}
                title={column.title}
                columnId={columnId}
              />
            </Context.Provider>
          </View>
        ))}
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
    position: 'relative',
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
