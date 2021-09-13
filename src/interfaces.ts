import {Dispatch} from 'react';

export interface ICardItem {
  title: string;
  text: string;
  cardPressed?: boolean;
  setCardPressed?: Dispatch<boolean>;
}
