import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { store } from '../store';
import { Client } from '../reducer/client.reducer';
import { HttpClient } from '@angular/common/http';
import { BaseApi } from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }
addClients(payload: object): Observable<any> {
  return this.http.post<any>(BaseApi.URL + BaseApi.PATH['ADD_CLIENTS'], payload);
}
getClients(): Observable<any> {
  return this.http.get(BaseApi.URL + BaseApi.PATH['CLIENTS']);
}
gettableData(): Observable<Client[]> {
  const { ELEMENT_DATA } = store.getState().clients;
  return Observable.of(ELEMENT_DATA);
}
}
