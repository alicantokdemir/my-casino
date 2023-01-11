import { Component } from '@angular/core';
// import { games } from './games';
import { Store } from '@ngrx/store';

import { selectGames } from '../state/games.selectors';
import { GamesApiActions } from './games.actions';
import { GamesService } from './games.service';

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
  constructor(private gamesService: GamesService, private store: Store) {}

  onTabChange(e: any) {
    const { filters } = this.gameTabs[e.index];

    this.gamesService
      .getGames(filters)
      .subscribe((games) =>
        this.store.dispatch(GamesApiActions.retrievedGamesList({ games }))
      );
  }

  breakpoint = 5;

  games$ = this.store.select(selectGames);

  ngOnInit() {
    this.breakpoint = getGridColCount(window.innerWidth);

    this.gamesService
      .getGames(this.gameTabs[0].filters)
      .subscribe((games) =>
        this.store.dispatch(GamesApiActions.retrievedGamesList({ games }))
      );
  }

  onResize(event: any) {
    this.breakpoint = getGridColCount(event.target?.innerWidth);
  }

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
}
