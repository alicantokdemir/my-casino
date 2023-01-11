import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Jackpot } from './jackpots.model';

@Injectable({ providedIn: 'root' })
export class JackpotsService {
  constructor(private http: HttpClient) {}

  getJackpots(): Observable<Array<Jackpot>> {
    return this.http
      .get<Jackpot[]>('http://stage.whgstage.com/front-end-test/jackpots.php')
      .pipe(
        map((jackpots) => {
          return jackpots || [];
        })
      );
  }
}
