import {Dispatch} from 'react';
import {Animated} from 'react-native';

export interface ICardItem {
  cardId: number;
  title: string;
  text: string;
  columnId: number;
  selected?: boolean;
  setAddButtonVisible: Dispatch<boolean>;
  // setTextSelected: Dispatch<number[]>;
}

export interface IColumnItem {
  items: any[];
  title: string;
  columnId: number;
}

export interface IBottomButtons {
  onAddPress: () => void;
}

export interface IColumn {
  title: string;
  cards: [ICard];
}

export interface ICard {
  title: string;
  text: string;
}
