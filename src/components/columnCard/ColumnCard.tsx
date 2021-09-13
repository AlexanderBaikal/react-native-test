import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Colors, IconButton} from 'react-native-paper';

type ColumnCardProps = {
  children: React.FC;
  title: string;
  cardPressed: boolean;
};

const ColumnCard: React.FC<ColumnCardProps> = ({
  children,
  title,
  cardPressed,
}) => {
  return (
    <View style={styles.columnContainer}>
      <Text style={styles.columnHeader}>{title}</Text>
      <View style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {children}
          <IconButton
            icon="plus"
            color={Colors.grey500}
            size={40}
            onPress={() => console.log('Pressed')}
            style={styles.menuIcon}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    backgroundColor: '#eeefff',
    height: '95%',
    width: '90%',
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
    backgroundColor: '#673ab7',
    color: '#fff',
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
  contentContainer: {
    paddingVertical: '2.5%',
  },
  scrollView: {
    position: 'relative',
  },
});

export default ColumnCard;
