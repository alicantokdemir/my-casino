import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Game } from '../games/games.model';
import { selectJackpotObj } from './jackpots.selectors';

export const selectGames = createFeatureSelector<ReadonlyArray<Game>>('games');

export const selectGamesByCategories = (categories: string[]) =>
  createSelector(selectGames, (games) =>
    games.filter((game) =>
      categories.some((filter) => game.categories.includes(filter))
    )
  );

export const selectGameJackpots = createSelector(
  selectGames,
  selectJackpotObj,
  (games, jackpots) => {
    return games.filter((game) => jackpots[game.id]);
  }
);
