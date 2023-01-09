import { Component } from '@angular/core';
import { games } from './games';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  breakpoint = 5;
  ngOnInit() {
    this.breakpoint = getGridColCount(window.innerWidth);
  }

  onResize(event: any) {
    this.breakpoint = getGridColCount(event.target?.innerWidth);
  }

  title = 'my-casino';

  games = games;

  gameTabs = [
    {
      label: 'Top Games',
    },
    {
      label: 'New Games',
    },
    {
      label: 'Slots',
    },
    {
      label: 'Jackpots',
    },
    {
      label: 'Live',
    },
    {
      label: 'Blackjack',
    },
    {
      label: 'Roulette',
    },
    {
      label: 'Table',
    },
    {
      label: 'Poker',
    },
    {
      label: 'Other',
    },
  ];
}
