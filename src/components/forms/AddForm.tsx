import React, {Dispatch, useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Context from '../../Context';
import {homeScreenValues} from '../../consts/consts';

type addFormProps = {
  type?: string;
  setScreenValue: Dispatch<string>;
};

const AddForm: React.FC<addFormProps> = ({type = 'column', setScreenValue}) => {
  const {addColumn, addCard, selectedCol, setSelectedCol, cardItems} =
    useContext(Context);

  const [columnName, setColumnName] = useState(
    type === 'card' && selectedCol !== -1 ? cardItems[selectedCol].title : '',
  );
  const [cardName, setCardname] = useState('');
  const [textValue, setTextValue] = useState('');

  const onAddComplete = () => {
    if (type === 'card') {
      if (cardName !== '') addCard(selectedCol, cardName, textValue);
    } else {
      if (columnName !== '') addColumn(columnName);
    }
    setScreenValue(homeScreenValues.LIST);
    setColumnName('');
    setCardname('');
    setTextValue('');
    setSelectedCol(-1);
  };

  return (
    <View style={styles.addColumn}>
      <View style={styles.inputView}>
        <Text style={styles.addColumnLabel}>Column name</Text>
        <TextInput
          mode="outlined"
          value={columnName}
          onChangeText={setColumnName}
          disabled={type === 'card'}
        />
      </View>
      {type === 'card' ? (
        <>
          <View style={styles.inputView}>
            <Text style={styles.addColumnLabel}>Card name</Text>
            <TextInput
              mode="outlined"
              value={cardName}
              onChangeText={setCardname}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.addColumnLabel}>Text</Text>
            <TextInput
              mode="outlined"
              multiline
              numberOfLines={6}
              value={textValue}
              onChangeText={setTextValue}
            />
          </View>
        </>
      ) : null}
      <Button
        mode="contained"
        onPress={onAddComplete}
        style={styles.completeButton}>
        Ok
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  addColumn: {
    width: '90%',
    left: '5%',
    display: 'flex',
    justifyContent: 'center',
  },
  completeButton: {
    width: 50,
    marginTop: 12,
  },
  addColumnLabel: {
    marginTop: 12,
    fontWeight: '700',
    fontSize: 16,
  },
  inputView: {},
});

export default AddForm;
