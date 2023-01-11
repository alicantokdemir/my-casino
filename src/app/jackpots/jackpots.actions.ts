import { createActionGroup, props } from '@ngrx/store';
import { Jackpot } from './jackpots.model';

export const JackpotsApiActions = createActionGroup({
  source: 'Jackpots API',
  events: {
    'Retrieved Jackpots List': props<{ jackpots: ReadonlyArray<Jackpot> }>(),
  },
});
