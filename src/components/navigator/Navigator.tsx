import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Panorama from '../screens/Panorama';
import {screens} from '../../consts/consts';
import HomeScreen from './../screens/HomeScreen';
import {IconButton, Colors} from 'react-native-paper';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="App"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={screens.PANORAMA} component={Panorama} />
    </Stack.Navigator>
  );
};

export default Navigator;
