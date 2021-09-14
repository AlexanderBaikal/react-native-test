import {useNavigation} from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Context from '../../Context';
import {IColumnItem} from '../../interfaces';
import {homeScreenValues, screens} from '../../consts/consts';
import MyCard from './MyCard';
import BottomButtons from './BottomButtons';

const MyColumn: React.FC<IColumnItem> = ({items, title, columnId}) => {
  const {dropColumn, setSelectedCol, setScreenValue} = useContext(Context);

  const navigation = useNavigation();

  const [startItem, setStartItem] = useState(0);

  let slicedItems = items.slice(startItem, startItem + 3);

  const onUpPress = () => {
    if (startItem > 0) setStartItem(startItem - 1);
  };

  const onDownPress = () => {
    if (startItem + 1 < items.length) setStartItem(startItem + 1);
  };

  const onAddPress = () => {
    // @ts-ignore
    navigation.navigate(screens.HOME_SCREEN);
    setScreenValue(homeScreenValues.CARD);
    setSelectedCol(columnId);
  };

  return (
    <>
      <View
        style={[
          styles.columnContainer,
          {backgroundColor: dropColumn === columnId ? '#dddeee' : '#eeefff'},
        ]}>
        <Text style={styles.columnHeader}>{title}</Text>
        <View style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.cards}>
              {slicedItems.map((card, cardId) => (
                <MyCard
                  cardId={cardId}
                  columnId={columnId}
                  key={card.title}
                  title={card.title}
                  text={card.text}
                />
              ))}
            </View>
          </View>
        </View>
        <BottomButtons
          onUpPress={onUpPress}
          onDownPress={onDownPress}
          onAddPress={onAddPress}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    height: '95%',
    width: '90%',
    borderRadius: 6,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  columnHeader: {
    fontWeight: '700',
    fontSize: 18,
    paddingHorizontal: '5%',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#bbbccc',
    backgroundColor: '#673ab7',
    color: '#fff',
  },

  contentContainer: {
    paddingVertical: '2.5%',
  },
  scrollView: {
    position: 'relative',
  },
  cards: {},
});

export default MyColumn;
