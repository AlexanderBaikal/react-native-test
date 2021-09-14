import {useNavigation} from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {screens} from '../navigator/naviConsts';

import {
  IconButton,
  Colors,
  Card,
  TouchableRipple,
  TextInput,
  Button,
} from 'react-native-paper';
import Context from '../../Context';

const HomeScreen = () => {
  const navigation = useNavigation();

  const {cardItems} = useContext(Context);

  const handleNavigate = () => {
    navigation.navigate(screens.PANORAMA);
  };

  const [addForm, setAddForm] = useState(false);
  const [cardList, setCardList] = useState(false);

  return (
    <ScrollView>
      <TouchableOpacity onPress={handleNavigate}>
        <Text>Перейти на скрин 2</Text>
      </TouchableOpacity>

      <IconButton
        icon="menu"
        color={Colors.grey500}
        size={40}
        onPress={() => setCardList(prev => !prev)}
        style={styles.menuIcon}
      />

      {addForm ? (
        <View style={styles.addColumn}>
          <TextInput label="Column name" mode="outlined" />
          <Button
            mode="contained"
            onPress={() => setAddForm(false)}
            style={styles.completeButton}>
            Ok
          </Button>
        </View>
      ) : (
        <View>
          {cardItems.map(column => (
            <Card key={column.title} style={styles.cardItem}>
              <TouchableRipple
                onPress={() => console.log('Pressed')}
                rippleColor="rgba(0, 0, 0, .12)">
                <Card.Title title={column.title} />
              </TouchableRipple>
            </Card>
          ))}

          <IconButton
            icon="plus"
            color={Colors.grey500}
            size={40}
            onPress={() => setAddForm(true)}
            style={styles.menuIcon}
          />
        </View>
      )}
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
  addColumn: {
    width: '90%',
    left: '5%',
    display: 'flex',
    justifyContent: 'center',
  },
  completeButton: {
    width: 50,
    marginTop: 12,
  },
});

export default HomeScreen;
