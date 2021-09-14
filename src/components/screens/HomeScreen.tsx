import {useNavigation} from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {homeScreenValues, screens} from '../../consts/consts';

import {IconButton, Colors, Card, TouchableRipple} from 'react-native-paper';
import Context from '../../Context';
import AddForm from '../forms/AddForm';
import {IColumn} from '../../interfaces';

const HomeScreen = () => {
  const navigation = useNavigation();

  const {cardItems, screenValue, setScreenValue, setSelectedCol} =
    useContext(Context);

  const onMenuPress = () => {
    setScreenValue(
      screenValue === homeScreenValues.NOTHING
        ? homeScreenValues.LIST
        : homeScreenValues.NOTHING,
    );
  };

  const onColumnPress = (i: number) => {
    setSelectedCol(i); // @ts-ignore
    navigation.navigate(screens.PANORAMA);
  };

  return (
    <ScrollView>
      <IconButton
        icon="menu"
        color={Colors.grey500}
        size={40}
        onPress={onMenuPress}
        style={styles.menuIcon}
      />

      {screenValue === homeScreenValues.LIST ? (
        <>
          {cardItems.map((column: IColumn, i: number) => (
            <Card key={column.title} style={styles.cardItem}>
              <TouchableRipple
                onPress={() => onColumnPress(i)}
                rippleColor="rgba(0, 0, 0, .12)">
                <Card.Title title={column.title} />
              </TouchableRipple>
            </Card>
          ))}

          <IconButton
            icon="plus"
            color={Colors.grey500}
            size={40}
            onPress={() => setScreenValue(homeScreenValues.COLUMN)}
            style={styles.menuIcon}
          />
        </>
      ) : screenValue === homeScreenValues.CARD ? (
        <AddForm setScreenValue={setScreenValue} type="card" />
      ) : screenValue === homeScreenValues.COLUMN ? (
        <AddForm setScreenValue={setScreenValue} />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    margin: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 6,
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardItem: {
    marginVertical: 4,
    width: '90%',
    left: '5%',
  },
});

export default HomeScreen;
