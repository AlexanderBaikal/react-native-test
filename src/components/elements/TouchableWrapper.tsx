import React from 'react';
import {TouchableOpacity} from 'react-native';

const TouchableWrapper = ({children, onPress, selected}) => {
  return selected ? (
    <>{children}</>
  ) : (
    <TouchableOpacity onPressIn={onPress}>{children}</TouchableOpacity>
  );
};

export default TouchableWrapper;
