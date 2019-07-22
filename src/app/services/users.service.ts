import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApi } from '../helpers/constants';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'});
  constructor(private http: HttpClient) { }

  getActivation(id: number, status: boolean): Observable<any> {
    return this.http.put(`${BaseApi.URL + BaseApi.PATH['ACTIVATION']}/${id}?status=${status}`, {});
  }

    getUserApproval(payload: object): Observable<any> {
      return this.http.put(BaseApi.URL + BaseApi.PATH['APPROVE_USER'], payload);
    }
  addNewUser(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH['ADD_USER'], payload);
  }
  updateUser(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH['UPDATE_USER'], payload);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${BaseApi.URL + BaseApi.PATH['DELETE']}/${id}`);
  }
  userList(id: number): Observable<any> {
    return this.http.get<any>(`${BaseApi.URL + BaseApi.PATH['USERS']}/${id}`);
  }
}
