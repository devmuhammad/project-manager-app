import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import { IAppState, store } from '../store';
import 'rxjs/add/observable/of';
import { server, ServerAccount, serverCredentials, serverTools, serverApplications } from '../reducer/server.reducer';
@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor() { }

  getSeverAccount():Observable<ServerAccount[]>{
    const {ACCOUNT} = store.getState().server;
   return Observable.of(ACCOUNT);
  }
  getServerCredentials():Observable<serverCredentials[]>{
    const {CREDENTIALS} = store.getState().server;
   return Observable.of(CREDENTIALS);
  }

  getServerTools():Observable<serverTools[]>{
    const {TOOLS} = store.getState().server;
   return Observable.of(TOOLS);
  }

  getServerApps():Observable<serverApplications[]>{
    const {APPLICATIONS} = store.getState().server;
   return Observable.of(APPLICATIONS);
  }
}

