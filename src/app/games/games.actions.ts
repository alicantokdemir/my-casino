import { createActionGroup, props } from '@ngrx/store';
import { Game } from './games.model';

export const GamesApiActions = createActionGroup({
  source: 'Games API',
  events: {
    'Retrieved Games List': props<{ games: ReadonlyArray<Game> }>(),
  },
});
