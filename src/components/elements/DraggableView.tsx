import React, {useContext, useRef} from 'react';
import {Animated, PanResponder} from 'react-native';
import Context from '../../Context';

const DraggableView = ({children}) => {
  const {
    activeCard,
    activeColumn,
    dropColumn,
    setActiveCard,
    setActiveColumn,
    setDropColumn,
    windowWidth,
    moveCard,
  } = useContext(Context);

  const onDropCard = () => {
    setDropColumn(dropColumnRef.current);
    if (dropColumnRef.current !== -1 && activeColumn !== dropColumnRef.current)
      moveCard(activeColumn, activeCard, dropColumnRef.current);
  };

  const dropColumnRef = useRef(dropColumn);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        let panPos = {
          // @ts-ignore
          x: pan.x._value, // @ts-ignore
          y: pan.y._value,
        };

        pan.setOffset(panPos);
        pan.setOffset(panPos);
      },
      onPanResponderMove: (event, gestureState) => {
        // if (textInputRef.current.isFocused()) {
        //   return;
        // }

        Animated.event([null, {dx: pan.x, dy: pan.y}], {
          listener: e => {
            let dropValue;
            // @ts-ignore
            if (pan.x._value > windowWidth / 2) {
              dropValue = activeColumn + 1;
              // @ts-ignore
            } else if (pan.x._value < -windowWidth / 2) {
              dropValue = activeColumn - 1;
            } else {
              dropValue = -1;
            }
            if (dropColumnRef.current !== dropValue) {
              dropColumnRef.current = dropValue;
            }
          },
          useNativeDriver: false,
        })(event, gestureState);
      },
      onPanResponderStart: () => {
        // setActiveCard(cardId);
        // setActiveColumn(columnId);
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
    <Animated.View
      style={{
        transform: [{translateX: pan.x || 0}, {translateY: pan.y || 0}],
      }}
      {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
};

export default DraggableView;
