import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { store } from '../store';
import { Client } from '../reducer/client.reducer';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor() { }

  gettableData(): Observable<Client[]> {
    const { ELEMENT_DATA } = store.getState().clients;
    return Observable.of(ELEMENT_DATA);
  }
}
