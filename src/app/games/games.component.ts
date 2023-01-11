import { Component } from '@angular/core';
// import { games } from './games';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JackpotsApiActions } from '../jackpots/jackpots.actions';

import { selectGames, selectGamesByCategories } from '../state/games.selectors';
import { selectJackpotObj } from '../state/jackpots.selectors';
import { GamesApiActions } from './games.actions';
import { Game } from './games.model';
import { GamesService } from './games.service';
import { JackpotsService } from '../jackpots/jackpots.service';

function getGridColCount(innerWidth: number) {
  if (innerWidth <= 450) {
    return 1;
  } else if (innerWidth <= 600) {
    return 2;
  } else if (innerWidth <= 800) {
    return 3;
  } else if (innerWidth <= 1000) {
    return 4;
  } else {
    return 5;
  }
}

@Component({
  selector: 'games-list',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesListComponent {
  constructor(
    private gamesService: GamesService,
    private store: Store,
    private jackpotsService: JackpotsService
  ) {}

  onTabChange(e: any) {
    const { filters } = this.gameTabs[e.index];
    this.games$ = this.store.select(selectGamesByCategories(filters));
  }

  breakpoint = 5;

  gameTabs = [
    {
      label: 'Top Games',
      filters: ['top'],
    },
    {
      label: 'New Games',
      filters: ['new'],
    },
    {
      label: 'Slots',
      filters: ['slots'],
    },
    {
      label: 'Jackpots',
      filters: ['jackpots'],
    },
    {
      label: 'Live',
      filters: ['live'],
    },
    {
      label: 'Blackjack',
      filters: ['blackjack'],
    },
    {
      label: 'Roulette',
      filters: ['roulette'],
    },
    {
      label: 'Table',
      filters: ['blackjack', 'roulette', 'poker'],
    },
    {
      label: 'Poker',
      filters: ['poker'],
    },
    {
      label: 'Other',
      filters: ['ball', 'virtual', 'fun'],
    },
  ];

  games$ = this.store.select(selectGamesByCategories(this.gameTabs[0].filters));
  jackpots$ = this.store.select(selectJackpotObj);

  ngOnInit() {
    this.breakpoint = getGridColCount(window.innerWidth);

    this.gamesService.getGames().subscribe((games) => {
      this.store.dispatch(GamesApiActions.retrievedGamesList({ games }));
    });

    this.jackpotsService.getJackpots().subscribe((jackpots) => {
      console.log('jackpots ', jackpots)
      this.store.dispatch(
        JackpotsApiActions.retrievedJackpotsList({ jackpots })
      );
    });
  }

  onResize(event: any) {
    this.breakpoint = getGridColCount(event.target?.innerWidth);
  }
}
