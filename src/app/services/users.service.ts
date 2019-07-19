import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApi } from '../helpers/constants';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${BaseApi.URL + BaseApi.PATH['DELETE']}/${id}`)
  }
  userList(id: number): Observable<any> {
    return this.http.get<any>(`${BaseApi.URL + BaseApi.PATH['USERS']}/${id}`);
  }
}
