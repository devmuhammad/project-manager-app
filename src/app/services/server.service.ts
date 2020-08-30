import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import { IAppState, store } from '../store';
import 'rxjs/add/observable/of';
import { server, ServerAccount, serverCredentials, serverTools, serverApplications } from '../reducer/server.reducer';

import { HttpClient } from '@angular/common/http';
import { BaseApi } from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  // SERVER ACCOUNT
  getSeverAccount():Observable<ServerAccount[]>{
    const {ACCOUNT} = store.getState().server;
   return Observable.of(ACCOUNT);
  }

  getServerAccountList(): Observable<any> {
    return this.http.get(BaseApi.URL + BaseApi.PATH['SERVER_ACCOUNT_LIST']);
  }

  getServerAccountProject(projectId): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH['SERVER_ACCOUNT_PROJECT']}/?projectid=${projectId}`);
  }

  addServerAccount(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH.ADD_SERVER_ACCOUNT, payload);
  }

  updateServerAccount(payload: object): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH.UPDATE_SERVER_ACCOUNT, payload);
  }

  deleteServerAccount(id: number): Observable<any> {
    return this.http.delete(`${BaseApi.URL + BaseApi.PATH['DELETE_SERVER_ACCOUNT']}/${id}`);
  }

  // SERVER CREDENTIALS
  getServerCredentials():Observable<serverCredentials[]>{
    const {CREDENTIALS} = store.getState().server;
   return Observable.of(CREDENTIALS);
  }

  getServerCredentialsList(): Observable<any> {
    return this.http.get(BaseApi.URL + BaseApi.PATH['SERVER_CREDENTIAL_LIST']);
  }

  getServerCredentialsProject(projectId): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH['SERVER_CREDENTIAL_PROJECT']}/?projectid=${projectId}`);
  }

  addServerCredential(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH.ADD_SERVER_CREDENTIAL, payload);
  }

  updateServerCredential(payload: object): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH.UPDATE_SERVER_CREDENTIAL, payload);
  }

  deleteServerCredential(id: number): Observable<any> {
    return this.http.delete(`${BaseApi.URL + BaseApi.PATH['DELETE_SERVER_CREDENTIAL']}/${id}`);
  }

  // SERVER TOOLS
  getServerTools():Observable<serverTools[]>{
    const {TOOLS} = store.getState().server;
   return Observable.of(TOOLS);
  }

  getServerToolsList(): Observable<any> {
    return this.http.get(BaseApi.URL + BaseApi.PATH['SERVER_TOOLS_LIST']);
  }

  getServerToolsProject(projectId): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH['SERVER_TOOL_PROJECT']}/?projectid=${projectId}`);
  }

  addServerTool(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH.ADD_SERVER_TOOL, payload);
  }

  updateServerTool(payload: object): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH.UPDATE_SERVER_TOOL, payload);
  }

  deleteServerTool(id: number): Observable<any> {
    return this.http.delete(`${BaseApi.URL + BaseApi.PATH['DELETE_SERVER_TOOL']}/${id}`);
  }

  getServerApps():Observable<serverApplications[]>{
    const {APPLICATIONS} = store.getState().server;
   return Observable.of(APPLICATIONS);
  }
}

