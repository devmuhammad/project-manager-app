
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
  constructor(private http: HttpClient) { } 
  headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'});

     signup(payload: object): Observable<any> {
    return this.http.post<any>(BaseApi.URL + BaseApi.PATH['SIGNUP'], payload);
  }

  signUpRequest(id: number): Observable<any> {
    return this.http.get<any>(`${BaseApi.URL + BaseApi.PATH['SIGNUPREQUEST']}/${id}`);
  }

  signUpApprove(id: number, payload: object): Observable<any> {
    return this.http.put<any>(`${BaseApi.URL + BaseApi.PATH['SIGNUPAPPROVAL']}/${id}`, payload);
  }
}
