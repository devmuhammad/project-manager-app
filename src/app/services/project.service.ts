import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IAppState, store } from '../store';
import 'rxjs/add/observable/of';
import { ProjectType } from '../reducer/project.reducer';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BaseApi } from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
projects: [];
  // form: FormGroup = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   type: new FormControl('', Validators.required),
  //   description: new FormControl(''),
  //   // stagingSeverUrl: new FormControl(''),
  //   // productionServerUrl: new FormControl(''),
  //   // repository: new FormControl('', Validators.required),
  //   alias: new FormControl('',Validators.required),
  //   client: new FormControl('',Validators.required),
  //   projectmanager: new FormControl('',Validators.required),
  // });
  gettableData(): Observable<any[]> {

    const { projectList } = store.getState().project;
    return Observable.of(projectList);
  }
  // Projects
addnewProject(payload: object): Observable<any> {
  return this.http.post(BaseApi.URL + BaseApi.PATH.ADD_PROJECTS, payload);
}
getProjectList(payload: object) {
  return this.http.post(BaseApi.URL + BaseApi.PATH.PROJECTS, payload).toPromise().then(res => {
    // console.log(res.data);
   return this.projects = res.data.map((item: any) => ({...item}));
  });
}
  //  project type
  getProjectType(): Observable<any> {
    return this.http.get(BaseApi.URL + BaseApi.PATH.PROJECT_TYPES);
  }
  addProjectType(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH.PROJECT_TYPE_ADD, payload);
  }
  updateProjectType(payload: object): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH.PROJECT_TYPE_UPDATE, payload);
  }

  fetchProjectType(id): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.PROJECT_TYPES}/${id}`);
  }
}
