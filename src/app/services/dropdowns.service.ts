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
    return this.http.delete<any>(`${BaseApi.URL + BaseApi.PATH['DELETE_GROUP']}/${id}`);
  }
  updateGroup(payload: object): Observable<any> {
    return this.http.put<any>(BaseApi.URL + BaseApi.PATH['UPDATE_GROUP'], payload)
  }
  addNewGroup(payload: object): Observable<any> {
    return this.http.put<any>(BaseApi.URL + BaseApi.PATH['ADD_GROUP'],payload);
  }
  getDesignations(): Observable<any> {
    return this.http.get<any>(BaseApi.URL + BaseApi.PATH['DESIGNATIONS']);
  }
  getGroups(): Observable<any> {
    return this.http.get<any>(BaseApi.URL + BaseApi.PATH['GROUPLIST']);
  }
  getInstitutions(): Observable<any> {
    return this.http.get<any>(BaseApi.URL + BaseApi.PATH['INSTITUTIONS']);
  }
}
