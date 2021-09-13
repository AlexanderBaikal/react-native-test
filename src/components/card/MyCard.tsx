import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Animated,
  PanResponder,
  Alert,
} from 'react-native';
import {ICardItem} from '../../interfaces';

const MyCard: React.FC<ICardItem> = ({
  title,
  text,
  cardPressed,
  setCardPressed,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const [column, setColumn] = useState(0);

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
          if (pan.x._value > 200) {
            setColumn(1);
          }
          if (pan.x._value < -200) {
            setColumn(-1);
          }
        },
        useNativeDriver: false,
      }),
      onPanResponderStart: () => {
        if (setCardPressed) setCardPressed(true);
      },
      onPanResponderEnd: () => {
        pan.setValue({x: 0, y: 0});
        if (setCardPressed) setCardPressed(false);
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
          cardPressed ? styles.cardPressed : {},
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
      {cardPressed ? <View style={styles.cardPlaceholder}></View> : null}
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
    overflow: 'visible',
  },
});

export default MyCard;
