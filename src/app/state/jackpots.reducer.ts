import { createReducer, on } from '@ngrx/store';

import { JackpotsApiActions } from '../jackpots/jackpots.actions';
import { Jackpot } from '../jackpots/jackpots.model';

export const initialState: ReadonlyArray<Jackpot> = [];

export const jackpotsReducer = createReducer(
  initialState,
  on(
    JackpotsApiActions.retrievedJackpotsList,
    (_state, { jackpots }) => jackpots
  )
);
