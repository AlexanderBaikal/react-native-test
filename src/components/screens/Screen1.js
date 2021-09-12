import {useNavigation} from '@react-navigation/core';
import React from 'react';

import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Screen1 = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('Screen2');
  };

  return (
    <View>
      <Text>Screen1</Text>
      <TouchableOpacity onPress={handleNavigate}>
        <Text>Перейти на скрин 2</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Screen1;
