import {NavigationContainer} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
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

  const cardsItemsRef = useRef(cardItems);

  const moveCard = (startCol: number, startCard: number, destCol: number) => {
    if (
      !cardsItemsRef.current[destCol] ||
      !cardsItemsRef.current[startCol].cards[startCard]
    )
      return;
    console.log(
      JSON.stringify(cardsItemsRef.current[startCol].cards[startCard]),
    );

    let card = JSON.parse(
      JSON.stringify(cardsItemsRef.current[startCol].cards[startCard]),
    );
    let newCardItems = JSON.parse(JSON.stringify(cardsItemsRef.current));
    newCardItems[startCol].cards.splice(startCard, 1);
    newCardItems[destCol].cards.push(card);
    setCardItems(newCardItems.sort(compare));
    cardsItemsRef.current = newCardItems.sort(compare);
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
