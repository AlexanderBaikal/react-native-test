import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors, IconButton} from 'react-native-paper';
import {IBottomButtons} from '../../interfaces';

const BottomButtons: React.FC<IBottomButtons> = ({
  onUpPress,
  onDownPress,
  onAddPress,
}) => {
  return (
    <View style={styles.bottomButtons}>
      <IconButton
        icon="plus"
        color={Colors.grey500}
        size={40}
        onPress={onAddPress}
        style={styles.menuIcon}
      />
      <View style={styles.naviButtons}>
        <IconButton
          icon="arrow-up"
          color={Colors.grey500}
          size={40}
          onPress={onUpPress}
          style={styles.menuIcon}
        />
        <IconButton
          icon="arrow-down"
          color={Colors.grey500}
          size={40}
          onPress={onDownPress}
          style={styles.menuIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 10,
    position: 'absolute',
    bottom: 12,
  },
  naviButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: '2.5%',
  },
  menuIcon: {
    marginHorizontal: '5%',
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 6,
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default BottomButtons;
