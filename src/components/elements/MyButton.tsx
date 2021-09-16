import React from 'react';
import {StyleSheet, View} from 'react-native';

const MyButton = props => {
  return (
    <View style={[styles.cardContainer, styles.menuIcon, props.style]}>
      {props.children}
    </View>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  menuIcon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
