import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {CARDS} from './src/cards';
import Navigator from './src/components/navigator/Navigator';
import {homeScreenValues} from './src/consts/consts';
import Context from './src/Context';

const App = () => {
  const [cardItems, setCardItems] = useState(CARDS.sort(compare));

  function compare(a: any, b: any) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }

  const moveCard = (startCol: number, startCard: number, destCol: number) => {
    console.log(startCol, startCard, destCol);

    if (!cardItems[destCol]) return;
    let result;
    let card = cardItems[startCol].cards[startCard];
    let updatedStartCol = {
      ...cardItems[startCol],
      cards: cardItems[startCol].cards.filter((_, id) => id !== startCard),
    };
    let updatedDestCol = {
      ...cardItems[destCol],
      cards: [...cardItems[destCol].cards, card],
    };
    let anotherCols = cardItems.filter(
      (_, id) => id !== startCol && id !== destCol,
    );
    result = [updatedStartCol, ...anotherCols, updatedDestCol];

    setCardItems(result.sort(compare));
  };

  const changeText = (col: number, card: number, value: string) => {
    let newCardItems = JSON.parse(JSON.stringify(cardItems));
    newCardItems[col].cards[card].text = value;
    setCardItems(newCardItems);
  };

  const addColumn = (name: string) => {
    let newCol = {
      title: name,
      cards: [],
    };
    setCardItems([...cardItems, newCol]);
  };

  const addCard = (colName: number, cardName: string, textValue: string) => {
    let newCard = {
      title: cardName,
      text: textValue,
    };

    let newCardItems = JSON.parse(JSON.stringify(cardItems));
    newCardItems[colName].cards.push(newCard);
    setCardItems(newCardItems);
  };

  const [screenValue, setScreenValue] = useState(homeScreenValues.NOTHING);
  const [selectedCol, setSelectedCol] = useState(-1);

  return (
    <Context.Provider
      value={{
        cardItems,
        moveCard,
        changeText,
        addColumn,
        addCard,
        screenValue,
        setScreenValue,
        selectedCol,
        setSelectedCol,
      }}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
