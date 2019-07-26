import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
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

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    description: new FormControl(''),
    // stagingSeverUrl: new FormControl(''),
    // productionServerUrl: new FormControl(''),
    // repository: new FormControl('', Validators.required),
    alias: new FormControl('',Validators.required),
    client: new FormControl('',Validators.required),
    projectmanager: new FormControl('',Validators.required),
  });
  gettableData(): Observable<ProjectType[]> {
    const { ELEMENT_DATA } = store.getState().project;
    return Observable.of(ELEMENT_DATA);
  }
}
