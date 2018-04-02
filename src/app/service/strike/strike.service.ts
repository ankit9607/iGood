import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StrikeService {

  private ROOT_URL : string = 'http://localhost:8081/api/';

  constructor(private http : HttpClient) { }

  getBestStrike() : Observable<number> {
    return this.http.get<number>(this.ROOT_URL+'bestStrike/strikeDuration/millis');
  }

  getAvgStrike() : Observable<number> {
    return this.http.get<number>(this.ROOT_URL+'avgStrike/strikeDuration/millis');
  }

  getLatestStrike() : Observable<number> {
    return this.http.get<number>(this.ROOT_URL+'latestStrike/creationDate/millis');
  }

}
