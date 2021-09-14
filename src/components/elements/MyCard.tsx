import React, {useContext, useRef, useState} from 'react';
import {View, Text, StyleSheet, Animated, PanResponder} from 'react-native';
import Context from '../../Context';
import {ICardItem} from '../../interfaces';

const MyCard: React.FC<ICardItem> = ({cardId, title, text, columnId}) => {
  const {
    activeCard,
    dropColumn,
    setActiveCard,
    setActiveColumn,
    setDropColumn,
    windowWidth,
    moveCard,
  } = useContext(Context);

  const onDropCard = () => {
    console.log(columnId, cardId, dropColumnRef.current);

    setDropColumn(dropColumnRef.current);
    if (dropColumnRef.current !== -1 && columnId !== dropColumnRef.current)
      moveCard(columnId, cardId, dropColumnRef.current);
  };

  const dropColumnRef = useRef(dropColumn);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        let panPos = {
          x: pan.x._value,
          y: pan.y._value,
        };

        pan.setOffset(panPos);
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        listener: event => {
          let dropValue;
          if (pan.x._value > windowWidth / 2) {
            dropValue = columnId + 1;
          } else if (pan.x._value < -windowWidth / 2) {
            dropValue = columnId - 1;
          } else {
            dropValue = -1;
          }

          if (dropColumnRef.current !== dropValue) {
            dropColumnRef.current = dropValue;
          }
        },
        useNativeDriver: false,
      }),
      onPanResponderStart: () => {
        setActiveCard(cardId);
        setActiveColumn(columnId);
        setDropColumn(-1); // ?
      },
      onPanResponderEnd: () => {
        onDropCard();
        pan.setValue({x: 0, y: 0});
        setActiveCard(-1);
        setActiveColumn(-1);
        setDropColumn(-1); // ?
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <View>
      <Animated.View
        style={[
          styles.cardContainer,
          activeCard === cardId ? styles.cardPressed : {},
          {
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          },
        ]}
        {...panResponder.panHandlers}>
        <View style={styles.headerContainer}>
          <Text style={styles.cardHeader}>{title}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardText}>{text}</Text>
        </View>
      </Animated.View>
      {activeCard === cardId ? (
        <View style={styles.cardPlaceholder}></View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    height: 130,
    marginHorizontal: '5%',
    marginVertical: '2.5%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 6,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: '100%',
  },
  textContainer: {
    display: 'flex',
    paddingHorizontal: 12,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardText: {
    fontSize: 16,
  },
  cardPlaceholder: {
    width: '90%',
    height: 130,
    marginHorizontal: '5%',
    marginVertical: '2.5%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 6,
  },
  cardPressed: {
    position: 'absolute',
    zIndex: 10,
    elevation: 12,
    shadowColor: '#333',
  },
});

export default MyCard;
