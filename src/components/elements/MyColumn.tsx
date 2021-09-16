import {useNavigation} from '@react-navigation/core';
import React, {useContext, useRef, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Animated} from 'react-native';
import Context from '../../Context';
import {IColumnItem} from '../../interfaces';
import {homeScreenValues, screens} from '../../consts/consts';
import MyCard from './MyCard';
import BottomButtons from './BottomButtons';
import HamburgerIcon from '../assets/icons/HamburgerIcon';
import DraggableView from './DraggableView';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MyColumn: React.FC<IColumnItem> = ({items, title, columnId}) => {
  const {
    setSelectedCol,
    setScreenValue,
    activeCard,
    activeColumn,
    windowHeight,
    setActiveCard,
    setActiveColumn,
  } = useContext(Context);

  const navigation = useNavigation();

  const goBack = () => {
    // @ts-ignore
    navigation.navigate(screens.HOME_SCREEN);
  };

  const onAddPress = () => {
    // @ts-ignore
    navigation.navigate(screens.HOME_SCREEN);
    setScreenValue(homeScreenValues.CARD);
    setSelectedCol(columnId);
  };

  const [addButtonVisible, setAddButtonVisible] = useState(true);

  const scrollValueRef = useRef(0);

  const onCardsScroll = e => {
    scrollValueRef.current = -e.nativeEvent.contentOffset.y;
  };

  // const [textSelected, setTextSelected] = useState([-1, -1]);

  return (
    <>
      <View style={[styles.columnContainer]}>
        <View style={styles.columnHeader}>
          <Text style={styles.columnHeaderText}>{title}</Text>
          <HamburgerIcon
            style={styles.menuIcon}
            fill="white"
            onPress={goBack}
          />
        </View>
        <View style={styles.columnContentContainer}>
          <ScrollView
            style={styles.contentContainer}
            onScroll={onCardsScroll}
            scrollEnabled={activeColumn === -1 && activeCard === -1}>
            <View style={styles.cards}>
              {items.map((card, cardId) => (
                <MyCard
                  cardId={cardId}
                  columnId={columnId}
                  title={card.title}
                  text={card.text}
                  setAddButtonVisible={setAddButtonVisible}
                  // setTextSelected={setTextSelected}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        {addButtonVisible ? <BottomButtons onAddPress={onAddPress} /> : null}
        {activeCard !== -1 && activeColumn === columnId ? (
          <View
            style={[
              styles.activeCard,
              {
                marginTop:
                  scrollValueRef.current +
                  (130 + windowHeight * 0.025 + 1) * activeCard -
                  1,
              },
            ]}>
            <DraggableView>
              <MyCard
                cardId={activeCard}
                columnId={activeColumn}
                key={items[activeCard]?.title}
                title={items[activeCard]?.title + ' (Dragmode)'}
                text={items[activeCard]?.text}
                setAddButtonVisible={setAddButtonVisible}
                selected
                // setTextSelected={setTextSelected}
              />
            </DraggableView>
          </View>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    height: '95%',
    width: '90%',
  },
  activeCard: {
    position: 'absolute',
    width: '100%',
    padding: 1,
    top: '10%',
  },

  columnContentContainer: {
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    backgroundColor: '#eeeeee',
    height: '90%',
  },
  columnHeader: {
    paddingHorizontal: '5%',
    paddingVertical: 12,
    backgroundColor: '#1976d2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#1976d2',
    borderTopEndRadius: 6,
    borderTopStartRadius: 6,
    borderWidth: 1,
  },
  columnHeaderText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  menuIcon: {
    margin: 0,
    maxHeight: 25,
    maxWidth: 25,
  },

  contentContainer: {
    paddingVertical: '2.5%',
  },

  cards: {
    paddingBottom: 80,
  },
});

export default MyColumn;
