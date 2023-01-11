import { createReducer, on } from '@ngrx/store';

import { GamesApiActions } from '../games/games.actions';
import { Game } from '../games/games.model';

export const initialState: ReadonlyArray<Game> = [];

export const gamesReducer = createReducer(
  initialState,
  on(GamesApiActions.retrievedGamesList, (_state, { games }) => games)
);
