
import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { ProjectService } from 'src/app/services/project.service';
import { DropdownsService } from 'src/app/services/dropdowns.service';

@Component({
  selector: 'app-update-task-type-modal',
  templateUrl: './update-task-type-modal.component.html',
  styleUrls: ['./update-task-type-modal.component.css']
})
export class UpdateTaskTypeModalComponent implements OnInit {

  form: FormGroup;
  client: object;
  formData: any;
  institutionList: [];
  isLoading: boolean;
  fetchmessage: any;
  public inputFields = {
    code: '',
    description: '',
    tasktypeid: '',
    institutionid: '',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) private row: any,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private snackbar: MatSnackBar,
    private dropdownService: DropdownsService,
    private status: ProjectService,
    private btnLoader: AngularButtonLoaderService,
    private dialogref: MatDialogRef<UpdateTaskTypeModalComponent>) {
    this.formData = this.row.data;
    console.log(this.formData);
    this.institutionList = this.row.institutions;
    // this.groupData = this.row.details;
    this.form = this.fb.group({
      code: [this.formData.code, Validators.required],
      description: [this.formData.description, Validators.required],
      institution: [this.formData.institution, Validators.required],
    });
  }
  fetchInstitutionList() {
    this.dropdownService.getInstitutions()
      .subscribe((res) => {
        this.institutionList = res.data;
        console.log(this.institutionList);
      });
  }

  ngOnInit() {
this.fetchInstitutionList();
  }
  save() {
    this.loadingBar.start();
    this.btnLoader.displayLoader();
    this.inputFields.code = this.form.get('code').value;
    this.inputFields.tasktypeid = this.formData.tasktypeid;
    this.inputFields.description = this.form.get('description').value;
    // this.inputFields.institutionid = this.form.get('institution').value;
    console.log(this.inputFields);
    return this.status.updatTaskType(this.inputFields)
    .subscribe(({ message, data}) => {
      console.log(message);
      console.log(data);
      if (message === 'Success' || 'Operation Successful') {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        this.snackbar.open('Task Type Updated Successful', 'Dismiss', {
          panelClass: ['success'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return this.dialogref.close();
      } else {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        return this.snackbar.open('Task Type Updated Failed', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    }, err => {
      this.loadingBar.complete();
      this.btnLoader.hideLoader();
      return this.snackbar.open('Type Update failed please check input and try again', 'Dismiss', {
        panelClass: ['error'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    });
  }
  doNothing() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
  }

  close() {
    this.dialogref.close();
  }
}
