import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Game } from '../games/games.model';
import { selectJackpots } from './jackpots.selectors';

export const selectGames = createFeatureSelector<ReadonlyArray<Game>>('games');

export const selectGamesByCategories = (categories: string[]) =>
  createSelector(selectGames, (games) =>
    games.filter((game) =>
      categories.some((filter) => game.categories.includes(filter))
    )
  );

// export const selectGameJackpots = createSelector(
//   selectGames,
//   selectJackpots,
//   (games, jackpots) => {
//     return collection.map((id) => books.find((book) => book.id === id));
//   }
// );
