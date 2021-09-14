import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CARDS} from './src/cards';
import Navigator from './src/components/navigator/Navigator';
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

  return (
    <Context.Provider value={{cardItems, moveCard}}>
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
