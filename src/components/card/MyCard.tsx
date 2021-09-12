import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ICardItem} from '../../interfaces';

const MyCard: React.FC<ICardItem> = ({title, text}) => {
  return (
    <View>
      <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.cardHeader}>{title}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardText}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    height: 150,
    marginHorizontal: '5%',
    marginVertical: '2.5%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 6,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: '100%',
  },
  textContainer: {
    display: 'flex',
    paddingHorizontal: 12,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardText: {
    fontSize: 16,
  },
});

export default MyCard;
