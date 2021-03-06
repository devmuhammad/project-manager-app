import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApi } from '../helpers/constants';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getdocumentType(): Observable<any> {
    return this.http.get(BaseApi.URL + BaseApi['PATH']['DOC_TYPE']);
  }
  updateDocumentTypes(payload: object): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH['DOC_TYPE_UPDATE'], payload);
  }

  // Conversations
  AddUserConversation(payload): Observable<any>{
    return this.http.post(`${BaseApi.URL + BaseApi.PATH.ADD_USER_CONVERSATION}`, payload);
  }
  AddGeneralConversation(payload): Observable<any>{
    return this.http.post(`${BaseApi.URL + BaseApi.PATH.ADD_GENERAL_CONVERSATION}`, payload);
  }
  AddProjectConversation(payload): Observable<any>{
    return this.http.post(`${BaseApi.URL + BaseApi.PATH.ADD_PROJECT_CONVERSATION}`, payload);
  }

  getProjectConversations(projectid): Observable<any>{
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.PROJECT_CONVERSATION}?projectid=${projectid}`);
  }
 
  getGeneralConversations(): Observable<any>{
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.GENERAL_CONVERSATION}`);
  }

  getUserConversations(payload): Observable<any>{
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.USER_CONVERSATION}?postedby=${payload.postedby}&receivedby=${payload.receivedby}`);
  }

  deleteConversation(id: number): Observable<any>{
    return this.http.delete(`${BaseApi.URL + BaseApi.PATH.DELETE_CONVERSATION}${id}`);
  }
  // END CONVERSATION

  getAssigneeActivities(param): Observable<any>{
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.ASSIGNEE_ACTIVITIES}?assigntoid=${param.assigntoid}
    &page=${param.page}&size=${param.size}`);
  }
  AddActivities(payload): Observable<any>{
    return this.http.post(`${BaseApi.URL + BaseApi.PATH.ADD_ACTIVITIES}`, payload);
  }
  deleteActivity(id: number): Observable<any>{
    return this.http.delete(`${BaseApi.URL + BaseApi.PATH.DELETE_ACTIVITIES}${id}`);
  }
  getActivitiesList(): Observable<any>{
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.LIST_ACTIVITIES}`)
    // ?page=${param.page}&size=${param.size}`);
  }
  fetchDocType(id: number): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH['DOC_RETRIEVE']}/${id}`);
  }
  getProjectActivity(id): Observable<any>{
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.PROJECT_ACTIVITY}?page=${0}&projectid=${id}&size=${30}`);
  }
  deleteDocType(id: number): Observable<any>{
    return this.http.delete(`${BaseApi.URL + BaseApi.PATH['DOC_TYPE_DELETE']}/${id}`);
  }
  addDocType(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH['DOC_TYPE_ADD'], payload);
  }
}
