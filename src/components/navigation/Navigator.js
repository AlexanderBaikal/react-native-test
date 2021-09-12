import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import ProfileScreen from '../screens/ProfileScreen';

const Navigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="App">
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen name="Screen2" component={Screen2} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
