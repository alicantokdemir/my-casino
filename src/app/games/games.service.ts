import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from './games.model';

@Injectable({ providedIn: 'root' })
export class GamesService {
  constructor(private http: HttpClient) {}

  getGames(): Observable<Array<Game>> {
    return this.http
      .get<Game[]>('http://stage.whgstage.com/front-end-test/games.php')
      .pipe(
        map((games) => {
          return games || [];
        })
      );
  }
}
