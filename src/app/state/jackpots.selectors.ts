import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Jackpot } from '../jackpots/jackpots.model';

export const selectJackpots =
  createFeatureSelector<ReadonlyArray<Jackpot>>('jackpots');
