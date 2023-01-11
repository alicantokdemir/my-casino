import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Jackpot } from '../jackpots/jackpots.model';
import { format } from '../../utils/money';

export const selectJackpots =
  createFeatureSelector<ReadonlyArray<Jackpot>>('jackpots');

export const selectJackpotObj = createSelector(selectJackpots, (jackpots) => {
  let jackpotsObj: { [key: string]: string } = {};

  jackpots.forEach((jackpot) => {
    jackpotsObj[jackpot.game] = format(jackpot.amount / 100);
  });

  return jackpotsObj;
});
