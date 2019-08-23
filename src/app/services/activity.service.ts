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

  getAssigneeActivities(param):Observable<any>{
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.ASSIGNEE_ACTIVITIES}?assigntoid=${param.assigntoid}
    &page=${param.page}&size=${param.size}`);
  }

  fetchDocType(id: number): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH['DOC_RETRIEVE']}/${id}`);
  }
  deleteDocType(id: number): Observable<any>{
    return this.http.delete(`${BaseApi.URL + BaseApi.PATH['DOC_TYPE_DELETE']}/${id}`);
  }
  addDocType(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH['DOC_TYPE_ADD'], payload);
  }
}
