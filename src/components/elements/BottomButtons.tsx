import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IBottomButtons} from '../../interfaces';
import AddIcon from '../assets/icons/AddIcon';
import MyButton from './MyButton';

const BottomButtons: React.FC<IBottomButtons> = ({onAddPress}) => {
  return (
    <View style={styles.bottom}>
      <MyButton>
        <AddIcon onPress={onAddPress} />
      </MyButton>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 10,
    position: 'absolute',
    bottom: '2.5%',
  },
});

export default BottomButtons;
