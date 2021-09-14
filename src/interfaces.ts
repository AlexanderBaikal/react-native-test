import {Dispatch} from 'react';

export interface ICardItem {
  cardId: number;
  title: string;
  text: string;
  columnId: number;
}

export interface IColumnItem {
  items: any[];
  title: string;
  columnId: number;
}

export interface IBottomButtons {
  onUpPress: () => void;
  onDownPress: () => void;
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
