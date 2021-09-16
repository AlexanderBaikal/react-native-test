import React, {Dispatch, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
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
          value={columnName}
          onChangeText={setColumnName}
          style={styles.textInput}
          editable={type !== 'card'}
        />
      </View>
      {type === 'card' ? (
        <>
          <View style={styles.inputView}>
            <Text style={styles.addColumnLabel}>Card name</Text>
            <TextInput
              value={cardName}
              onChangeText={setCardname}
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.addColumnLabel}>Text</Text>
            <TextInput
              multiline
              numberOfLines={6}
              value={textValue}
              onChangeText={setTextValue}
              style={styles.textInput}
            />
          </View>
        </>
      ) : null}
      <TouchableOpacity onPress={onAddComplete}>
        <View style={styles.completeButton}>
          <Text style={styles.buttonText}>Ok</Text>
        </View>
      </TouchableOpacity>
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
    width: 60,
    height: 40,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1976d2',
    flexDirection: 'column',
    borderRadius: 6,
    borderColor: '#fff',
    borderWidth: 1,
  },
  textInput: {
    borderColor: '#1976d2',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
  },
  buttonText: {
    color: '#fff',
  },
  addColumnLabel: {
    marginTop: 12,
    fontWeight: '700',
    fontSize: 16,
    color: '#1976d2',
  },
  inputView: {},
});

export default AddForm;
