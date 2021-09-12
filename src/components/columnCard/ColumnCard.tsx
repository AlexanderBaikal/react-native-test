import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Colors, IconButton} from 'react-native-paper';

const ColumnCard: React.FC = ({children}) => {
  return (
    <View style={styles.columnContainer}>
      <Text style={styles.columnHeader}>Column Header</Text>
      <ScrollView>
        {children}
        <IconButton
          icon="plus"
          color={Colors.grey500}
          size={40}
          onPress={() => console.log('Pressed')}
          style={styles.menuIcon}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    backgroundColor: '#eeefff',
    height: '95%',
    width: '90%',
    marginHorizontal: '5%',
    borderRadius: 6,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  columnHeader: {
    fontWeight: '700',
    fontSize: 18,
    paddingHorizontal: '5%',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#bbbccc',
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

export default ColumnCard;
