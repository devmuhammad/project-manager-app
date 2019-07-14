
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IAppState, store } from '../store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApi } from '../helpers/constants';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})

export class SignupService {
  headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'});
  constructor(private http: HttpClient) { }

     signup(payload: object): Observable<any> {
    return this.http.post<any>(BaseApi.URL + BaseApi.PATH['SIGNUP'], payload);

  }

}
