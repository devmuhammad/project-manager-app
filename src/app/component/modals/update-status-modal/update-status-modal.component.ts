


import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { ProjectService } from 'src/app/services/project.service';
import { DropdownsService } from 'src/app/services/dropdowns.service';

@Component({
  selector: 'app-update-status-modal',
  templateUrl: './update-status-modal.component.html',
  styleUrls: ['./update-status-modal.component.css']
})
export class UpdateStatusModalComponent implements OnInit {

  form: FormGroup;
  client: object;
  formData: any;
  institutionList: [];
  isLoading: boolean;
  fetchmessage: any;
  public inputFields = {
    code: '',
    description: '',
    statustypeid: '',
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
    private dialogref: MatDialogRef<UpdateStatusModalComponent>) {
    this.formData = this.row.data;
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
    this.inputFields.statustypeid = this.formData.statustypeid;
    this.inputFields.description = this.form.get('description').value;
    this.inputFields.institutionid = this.form.get('institution').value;
    console.log(this.inputFields);
    return this.status.updateStatus(this.inputFields)
    .subscribe(({ message, data}) => {
      console.log(message);
      console.log(data);
      if (message === 'Success' || 'Operation Successful') {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        this.snackbar.open('Status Updated Successful', 'Dismiss', {
          panelClass: ['success'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return this.dialogref.close();
      } else {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        return this.snackbar.open('Status Updated Failed', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    }, err => {
      this.loadingBar.complete();
      this.btnLoader.hideLoader();
      return this.snackbar.open('Status Update failed please check input and try again', 'Dismiss', {
        panelClass: ['error'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    });
  }
  close() {
    this.dialogref.close();
  }
}
