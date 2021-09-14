import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Colors, IconButton} from 'react-native-paper';
import Context from '../../Context';
import {ICardItem, IColumnItem} from '../../interfaces';
import MyCard from './MyCard';

const ColumnCard: React.FC<IColumnItem> = ({items, title, columnId}) => {
  const {dropColumn, windowWidth} = useContext(Context);

  const [startItem, setStartItem] = useState(0);

  let slicedItems = items.slice(startItem, startItem + 3);

  console.log(items.length);

  const onUpPress = () => {
    if (startItem > 0) setStartItem(startItem - 1);
  };

  const onDownPress = () => {
    if (startItem + 1 < items.length) setStartItem(startItem + 1);
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
        <View style={styles.bottomButtons}>
          <IconButton
            icon="plus"
            color={Colors.grey500}
            size={40}
            onPress={() => console.log('Add')}
            style={styles.menuIcon}
          />
          <View style={styles.naviButtons}>
            <IconButton
              icon="arrow-up"
              color={Colors.grey500}
              size={40}
              onPress={onUpPress}
              style={styles.menuIcon}
            />
            <IconButton
              icon="arrow-down"
              color={Colors.grey500}
              size={40}
              onPress={onDownPress}
              style={styles.menuIcon}
            />
          </View>
        </View>
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
  menuIcon: {
    marginHorizontal: '5%',
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 6,
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  contentContainer: {
    paddingVertical: '2.5%',
  },
  scrollView: {
    position: 'relative',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 10,
    position: 'absolute',
    bottom: 12,
  },
  naviButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: '2.5%',
  },
  cards: {},
});

export default ColumnCard;
