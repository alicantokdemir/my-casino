import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesListComponent } from './games/games.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { gamesReducer } from './state/games.reducer';
import { HttpClientModule } from '@angular/common/http';
import { jackpotsReducer } from './state/jackpots.reducer';

@NgModule({
  declarations: [AppComponent, GamesListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    StoreModule.forRoot({ games: gamesReducer, jackpots: jackpotsReducer }, {}),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
