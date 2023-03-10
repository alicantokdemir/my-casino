import { HttpClient } from '@angular/common/http';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { GamesListComponent } from './games/games.component';
import { GamesService } from './games/games.service';
import { JackpotsService } from './jackpots/jackpots.service';
import { StoreModule } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { gamesReducer } from './state/games.reducer';
import { jackpotsReducer } from './state/jackpots.reducer';
import { Jackpot } from './jackpots/jackpots.model';
import { Game } from './games/games.model';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MOCK_JACKPOTS: Jackpot[] = [
  {
    game: 'NEJACKANDTHEBEANSTALK',
    amount: 117928,
  },
  {
    game: 'LEPABLOPICASSOSLOT',
    amount: 56606,
  },
  {
    game: 'NEFLOWERS',
    amount: 35379,
  },
];
const MOCK_GAMES: Game[] = [
  {
    categories: ['top', 'slots', 'new'],
    name: 'The Wish Master',
    image: '//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg',
    id: 'NETHEWISHMASTER',
  },
  {
    categories: ['top', 'slots'],
    name: 'Aliens',
    image: '//stage.whgstage.com/scontent/images/games/NEALIENS.jpg',
    id: 'NEALIENS',
  },
  {
    categories: ['top', 'slots', 'new'],
    name: 'Starburst',
    image:
      '//stage.whgstage.com/scontent/images/games/NEJACKANDTHEBEANSTALK.jpg',
    id: 'NEJACKANDTHEBEANSTALK',
  },
];

describe('AppComponent', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let gamesService: GamesService;
  let jackpotsService: JackpotsService;

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    const gamesServiceSpy = jasmine.createSpyObj('GamesService', {
      getGames: of(MOCK_GAMES),
    });

    const jackpotsServiceSpy = jasmine.createSpyObj('JackpotsService', {
      getJackpots: of(MOCK_JACKPOTS),
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatTabsModule,
        MatGridListModule,
        MatCardModule,
        StoreModule.forRoot(
          { games: gamesReducer, jackpots: jackpotsReducer },
          {}
        ),
      ],
      declarations: [AppComponent, GamesListComponent],
      providers: [
        { provide: GamesService, useValue: gamesServiceSpy },
        { provide: JackpotsService, useValue: jackpotsServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
