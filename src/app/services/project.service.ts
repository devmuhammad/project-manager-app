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
 
  gettableData(): Observable<any[]> {
    const { projectList } = store.getState().project;
    // console.log(projectList);
    return Observable.of(projectList);
  }
  // Projects
  addnewProject(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH.ADD_PROJECTS, payload);
  }

  updateProject(payload: object): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH.PROJECT_UPDATE, payload);
  }
  // Team members
  getProjectTeamMembers(projectId): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH['TEAM_MEMBERS']}/${projectId}`);
  }
// project document
getProjectDocx(param):Observable<any>{
  return this.http.get(`${BaseApi.URL + BaseApi.PATH['PROJECT_DOCX']}?page=${param.page}
  &projectid=${param.projectid}&size=${param.size}`);
}
  // PROJECT ACTIVITY
  getProjectActivities(param): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.PROJECT_ACTIVITY}?page=${param.page}
    &projectid=${param.projectid}&size=${param.size}`);
  }
  getProjectManagers(projectid): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.PROJECT_MANAGER}?projectid=${projectid}`);
  }

  getActivitiesByProject(projectid): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.ACTIVITIES_BY_PROJECT}?projectid=${projectid}`);
  }
  getProjectList(payload: any): Observable<any> {
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

  addTaskType(payload): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH['TASK_TYPE_ADD'], payload);
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

  updateTask(payload: object): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH.TASK_UPDATE, payload);
  }
  getTasksList(payload: any): Observable<any> {
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.TASK_LIST}?page=${payload.page}&size=${payload.size}`);
  }
  getTaskByProject(param): Observable<any>{
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.TASK_BYPROJECT}?projectid=${param}`);
  }

  getAssigneeTasks(param): Observable<any>{
    return this.http.get(`${BaseApi.URL + BaseApi.PATH.TASK_ASSIGNEE}?assigntoid=${param.assigntoid}
    &page=${param.page}&size=${param.size}`);
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
  // delete status
  getDeleteStatus(id): Observable<any>{
    return this.http.delete(`${BaseApi.URL + BaseApi.PATH.DELETE_STATUS}/${id}`)
  }

  updateStatus(payload: object): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH['UPDATE_STATUS'], payload);
  }
  addStatus(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH['ADD_STATUS'], payload);
  }


  // REPO
  addRepo(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH['ADD_REPO'], payload);
  }

  addRepoBranch(payload: object): Observable<any> {
    return this.http.post(BaseApi.URL + BaseApi.PATH['ADD_BRANCH_REPO'], payload);
  }

  getRepoList(): Observable<any> {
    return this.http.get(BaseApi.URL + BaseApi.PATH['REPO_LIST']);
  }

  getRepoBranches(): Observable<any> {
    return this.http.get(BaseApi.URL + BaseApi.PATH['REPO_BRANCH_LIST']);
  }

  updateRepo(payload: object): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH['REPO_UPDATE'], payload);
  }

  updateRepoBranches(payload: object): Observable<any> {
    return this.http.put(BaseApi.URL + BaseApi.PATH['REPO_BRANCH_UPDATE'], payload);
  }

}
