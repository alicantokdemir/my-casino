import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Game } from '../games/games.model';
import { selectJackpots } from './jackpots.selectors';

export const selectGames = createFeatureSelector<ReadonlyArray<Game>>('games');

// export const selectGameJackpots = createSelector(
//   selectGames,
//   selectJackpots,
//   (games, jackpots) => {
//     return collection.map((id) => books.find((book) => book.id === id));
//   }
// );
