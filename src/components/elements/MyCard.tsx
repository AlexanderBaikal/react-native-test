import React, {useContext, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Context from '../../Context';
import {ICardItem} from '../../interfaces';
import TouchableWrapper from './TouchableWrapper';

const MyCard: React.FC<ICardItem> = ({
  cardId,
  title,
  text,
  columnId,
  selected = false,
  setAddButtonVisible,
  // setTextSelected,
}) => {
  const {
    activeCard,
    activeColumn,
    dropColumn,
    setActiveCard,
    setActiveColumn,
    setDropColumn,
    windowWidth,
    moveCard,
    changeText,
  } = useContext(Context);

  // console.log(pan);

  const [textValue, setTextValue] = useState(text);

  const textInputRef = useRef(null);

  const onBlur = () => {
    setAddButtonVisible(true);
    changeText(columnId, cardId, textValue);
    // setTextSelected([-1, -1]);
    // setActiveColumn(columnId);
    // setActiveCard(cardId);
  };

  const onFocus = () => {
    setAddButtonVisible(false);
    // setTextSelected([columnId, cardId]);
    // setActiveColumn(-1);
    // setActiveCard(-1);
  };

  const onTextPressIn = e => {
    // textInputRef.current.focus();
  };

  const onCardPressIn = () => {
    // setActiveCard(textSelected != [-1, -1] ? -1 : cardId);
    // setActiveColumn(textSelected != [-1, -1] ? [-1, -1] : columnId);
    setActiveCard(selected ? -1 : cardId);
    setActiveColumn(selected ? -1 : columnId);
  };

  return (
    <View
      style={[
        styles.cardContainer,
        selected
          ? styles.cardPressed
          : activeColumn === columnId && activeCard === cardId
          ? {
              opacity: 0.2,
            }
          : {},
      ]}>
      <TouchableWrapper onPress={onCardPressIn} selected={selected}>
        <View style={styles.headerContainer}>
          <Text style={styles.cardHeader}>{title}</Text>
        </View>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.cardText}
            onChangeText={setTextValue}
            value={textValue}
            ref={textInputRef}
            multiline
            onPressIn={onTextPressIn}
            numberOfLines={4}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </View>
      </TouchableWrapper>
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
    borderColor: '#bdbdbd',
    borderWidth: 1,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingBottom: 3,
    paddingTop: 6,
    width: '100%',
    height: '30%',
  },
  textContainer: {
    display: 'flex',
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 3,
    height: '70%',
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardText: {
    fontSize: 16,
    paddingVertical: 12,
    backgroundColor: '#eeeeee',
    borderRadius: 6,
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
    zIndex: 10,
    borderColor: '#2196f3',
  },
});

export default MyCard;
