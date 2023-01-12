import { HttpClient } from '@angular/common/http';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GamesListComponent } from './games.component';
import { GamesService } from './games.service';
import { JackpotsService } from '../jackpots/jackpots.service';
import { StoreModule } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { gamesReducer } from '../state/games.reducer';
import { jackpotsReducer } from '../state/jackpots.reducer';
import { Jackpot } from '../jackpots/jackpots.model';
import { Game } from './games.model';
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

describe('GamesListComponent', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let gamesService: GamesService;
  let jackpotsService: JackpotsService;

  let component: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;

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
      declarations: [GamesListComponent, GamesListComponent],
      providers: [
        { provide: GamesService, useValue: gamesServiceSpy },
        { provide: JackpotsService, useValue: jackpotsServiceSpy },
      ],
    }).compileComponents();

    gamesService = TestBed.inject(GamesService) as jasmine.SpyObj<GamesService>;
    jackpotsService = TestBed.inject(
      JackpotsService
    ) as jasmine.SpyObj<JackpotsService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render all top games', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.game-card').length).toBe(
      MOCK_GAMES.length
    );
  });

  it('should render all 10 tabs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.mat-mdc-tab').length).toBe(10);
  });

  it('should render all new games on tab change', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const newTab: HTMLElement = compiled.querySelectorAll(
      '[role="tab"]'
    )[1] as HTMLElement;
    newTab.dispatchEvent(new MouseEvent('click'));
    component.onTabChange({ index: 1 });
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.game-card').length).toBe(2);
  });
});
