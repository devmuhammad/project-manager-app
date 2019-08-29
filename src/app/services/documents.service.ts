import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IAppState, store } from '../store';
import { HttpClient } from '@angular/common/http';
import { BaseApi } from '../helpers/constants';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http: HttpClient) { }
  getDocumentList(credentials):Observable<any>{
    const {page,institutionId,size,sFilter,dateto,datefrom} = credentials;
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.DOCLIST}?institutionId=${institutionId}&page=${page}&size=${size}&dateto=${dateto}&datefrom=${datefrom}`);
  }

  updateDocument(payload):Observable <any>{
    return this.http.put(BaseApi.URL + BaseApi.PATH.DOC_UPDATE, payload);
  }

  uploadDocument(uploadfile):Observable<any> {
    return this.http.post(`${BaseApi.URL + BaseApi.PATH.DOC_UPLOAD}`, uploadfile)
  }
  downloadfile(filepayload):Observable <any> {
    const {documntId,userId} = filepayload;
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.DOC_DOWNLOAD}/${documntId}/${userId}`)
  }
  DocumentPreview(filepayload):Observable <any> {
    const {documntId,userId} = filepayload;
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.DOC_PREVIEW}/${documntId}/${userId}`)
  }
}
