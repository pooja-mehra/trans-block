import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  // for communication between two componenets
  latestPriceSource:BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private httpClient:HttpClient) { }

  getLatestPrice(){
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/price')
        .toPromise()
        .then(
          res => {
            return resolve({'result':res});
          }
        )
        .catch( err=> {
            return resolve({'result':err.ok});
        })
    });
}
}
