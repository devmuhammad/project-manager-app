import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/of';

import { HttpClient } from '@angular/common/http';
import { BaseApi } from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class ReasonService {

  constructor(private http: HttpClient) { }

  // REASONS

  getReasons(): Observable<any> {
    return this.http.get(BaseApi.URL + BaseApi.PATH['LIST_REASONS']);
  }

  addReason(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH.ADD_REASON, payload);
  }

  updateReason(payload: object): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH.UPDATE_REASON, payload);
  }

  deleteReason(id: number): Observable<any> {
    return this.http.delete(`${BaseApi.URL + BaseApi.PATH['DELETE_REASON']}/${id}`);
  }

}
