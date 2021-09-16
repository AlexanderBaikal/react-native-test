import {useNavigation} from '@react-navigation/core';
import React, {useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {homeScreenValues, screens} from '../../consts/consts';

import Context from '../../Context';
import AddForm from '../forms/AddForm';
import {IColumn} from '../../interfaces';
import HamburgerIcon from '../assets/icons/HamburgerIcon';
import AddIcon from '../assets/icons/AddIcon';
import MyButton from './../elements/MyButton';

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
      <MyButton style={{marginTop: '5%'}}>
        <HamburgerIcon onPress={onMenuPress} fill="#616161" />
      </MyButton>

      {screenValue === homeScreenValues.LIST ? (
        <>
          {cardItems.map((column: IColumn, i: number) => (
            <TouchableOpacity
              onPress={() => onColumnPress(i)}
              key={column.title}>
              <View style={[styles.cardContainer, {width: '90%', padding: 16}]}>
                <Text>{column.title} </Text>
              </View>
            </TouchableOpacity>
          ))}

          <MyButton>
            <AddIcon onPress={() => setScreenValue(homeScreenValues.COLUMN)} />
          </MyButton>
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
  cardItem: {
    marginVertical: 4,
    width: '90%',
    left: '5%',
  },
  cardContainer: {
    marginHorizontal: '5%',
    marginVertical: '2.5%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 6,
    borderColor: '#bdbdbd',
    borderWidth: 1,
  },
});

export default HomeScreen;
