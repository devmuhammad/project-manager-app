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
  // Tas
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
    console.log(projectList);
    return Observable.of(projectList);
  }
  // Projects
  addnewProject(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH.ADD_PROJECTS, payload);
  }
  // Team members
  getProjectTeamMembers(projectId): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH['TEAM_MEMBERS']}/${projectId}`);
  }

  // PROJECT ACTIVITY
  getProjectActivities(param): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.PROJECT_ACTIVITY}?page=${param.page}
    &projectid=${param.projectid}&size=${param.size}`);
  }
  getProjectList(payload: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.PROJECTS}?datefrom=${payload.datefrom}&dateto=${payload.dateto}&institutionId=${payload.institutionId}&page=${payload
      .page}&sFilter=All&size=${payload.size}`);
  }
  //  project type
  getProjectType(): Observable<any> {
    return this.http.get(BaseApi.URL + BaseApi.PATH['PROJECT_TYPES']);
  }
  addTaskToProject(payload): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH['TASK_ADD'], payload);
  }
  getTaskType(): Observable<any> {
    return this.http.get(BaseApi.URL + BaseApi.PATH['TASK_TYPES']);
  }
  addProjectType(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH['PROJECT_TYPE_ADD'], payload);
  }

  // Task
  addNewTask(payload): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH['TASK_ADD'], payload);
  }
  updatTaskType(payload): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH['TASK_TYPE_UPDATE'], payload);
  }
  updateProjectType(payload: object): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH['PROJECT_TYPE_UPDATE'], payload);
  }


  deleteProjectType(id: number): Observable<any> {
    return this.http.delete(`${BaseApi.URL + BaseApi.PATH['PROJECT_TYPE_DELETE']}/${id}`);
  }

  fetchProjectType(id): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH['PROJECTS_RETRIEVE']}/${id}`);
  }
  // Status Type
  getStatusList(): Observable<any> {
    return this.http.get(BaseApi.URL + BaseApi.PATH['STATUS']);
  }
  updateStatus(payload: object): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH['UPDATE_STATUS'], payload);
  }
  addStatus(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH['ADD_STATUS'], payload);
  }
}
