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
  windowWidth: number;
}
