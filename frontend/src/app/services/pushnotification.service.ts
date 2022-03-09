import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PushnotificationService {

  constructor(private httpClient:HttpClient) { }


}
