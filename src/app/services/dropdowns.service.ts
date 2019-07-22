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

  deleteGroup(id: number): Observable<any> {
    // fetched
    return this.http.delete<any>(`${BaseApi.URL + BaseApi.PATH['DELETE_GROUP']}/${id}`); 
  }
  updateGroup(payload: object): Observable<any> {
    // fetched
    return this.http.post<any>(BaseApi.URL + BaseApi.PATH['UPDATE_GROUP'], payload);
  }
  addNewGroup(payload: string): Observable<any> {
    // fetched
    return this.http.post<any>(`${BaseApi.URL + BaseApi.PATH['ADD_GROUP']}?groups=${payload}`, {});
  }
  getDesignations(): Observable<any> {
    // fetched
    return this.http.get<any>(BaseApi.URL + BaseApi.PATH['DESIGNATIONS']);
  }
  getGroups(): Observable<any> {
    // fetched
    return this.http.get<any>(BaseApi.URL + BaseApi.PATH['GROUPLIST']);
  }
  getInstitutions(): Observable<any> {
    // fetched
    return this.http.get<any>(BaseApi.URL + BaseApi.PATH['INSTITUTIONS']);
  }
  getRoles(): Observable<any> {
    // fetched
    return this.http.get<any>(BaseApi.URL + BaseApi.PATH['ROLES']);
  }
}
