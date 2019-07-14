import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IAppState, store } from '../store';
import { HttpClient } from '@angular/common/http';
import { BaseApi } from '../helpers/constants';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class DropdownsService {

  constructor(private http: HttpClient) { }

  getDesignations(): Observable<any> {
    return this.http.get<any>(BaseApi.URL + BaseApi.PATH['DESIGNATIONS']);
  }

  getInstitutions(): Observable<any> {
    return this.http.get<any>(BaseApi.URL + BaseApi.PATH['INSTITUTIONS']);
  }
}
