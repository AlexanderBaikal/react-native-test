import React from 'react';

import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';

const Screen2 = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text>Screen2</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Screen2;
