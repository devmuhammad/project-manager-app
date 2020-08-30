import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IAppState, store } from '../store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApi } from '../helpers/constants';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})


export class DocumentsService {

  toFormData( formValue) {
    const formData = new FormData();

    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }

  // userId: '',
  // receivedfrom: '',
  // file: '',
  // parentId: 0 as number,
  // taskId: '',
  // description: '',
  // projectId: 0 as number,
  // activityId: '',
  // doctypeId: 0 as number,


  constructor(private http: HttpClient) { }
  getDocumentList(credentials): Observable<any> {
    const {page, institutionId, size, sFilter, dateto, datefrom} = credentials;
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.DOCLIST}?  institutionId=${institutionId}&page=${page}&size=${size}&dateto=${dateto}&datefrom=${datefrom}`);
  }

  updateDocument(payload): Observable <any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH.DOC_UPDATE, payload);
  }
  deleteDocx(id): Observable<any> {
    return this.http.delete(`${BaseApi.URL + BaseApi.PATH.DOC_DELETE}/${id}`);
  }
  addDocument(credentials): Observable<any> {
    return this.http.post(`${BaseApi.URL + BaseApi.PATH.DOC_ADD}`, credentials);
  }
  uploadDocument(requestpayload): Observable<any> {
  
   const formData = new FormData();
   formData.append('userId',requestpayload.userId);
   formData.append('recivedfrom', requestpayload.receivedfrom);
   formData.append('file',requestpayload.file);
   formData.append('parentId',requestpayload.parentId);
   formData.append('taskId', requestpayload.taskId);
   formData.append('description',requestpayload.description);
   formData.append('projectId',requestpayload.projectId);
   formData.append('activityId',requestpayload.activityId);
   formData.append('doctypeId',requestpayload.doctypeId);
   formData.append('comment', "done");
   formData.append('minorEdit', "true");
  //  console.log(formData);
   return this.http.post(`${BaseApi.URL + BaseApi.PATH.DOC_UPLOAD}`, formData, {
      
      headers : new HttpHeaders({
        // 'Content-Type' : uploadfile.file.type
        // 'Content-Type': 'multipart/form-data;boundary='
      })});
  }
  downloadfile(filepayload): Observable <any> {
    const {documentId, userId} = filepayload;
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.DOC_DOWNLOAD}/${documentId}/${userId}`);
  }
  DocumentPreview(filepayload): Observable <any> {
    const {documentId, userId} = filepayload;
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.DOC_PREVIEW}?documentId=${documentId}&userId=${userId}`);
  }
}
