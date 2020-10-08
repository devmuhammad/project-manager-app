


import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { ProjectService } from 'src/app/services/project.service';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { ReasonService } from 'src/app/services/reason.service';

@Component({
  selector: 'app-update-reason',
  templateUrl: './update-reason.component.html',
  styleUrls: ['./update-reason.component.css']
})
export class UpdateReasonComponent implements OnInit {

  form: FormGroup;
  client: object;
  formData: any;
  institutionList: [];
  isLoading: boolean;
  fetchmessage: any;
  public inputFields = {
    id: 0,
    comments: '',
    description: '',
    // statustypeid: '',
    // institutionid: '',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) private row: any,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private snackbar: MatSnackBar,
    private dropdownService: DropdownsService,
    private service: ReasonService,
    private btnLoader: AngularButtonLoaderService,
    private dialogref: MatDialogRef<UpdateReasonComponent>) {
    this.formData = this.row.data;
    this.institutionList = this.row.institutions;
    // this.groupData = this.row.details;
    this.form = this.fb.group({
      code: [this.formData.comments, Validators.required],
      description: [this.formData.description, Validators.required],
      // institution: [this.formData.institution, Validators.required],
    });
  }
  fetchInstitutionList() {
    this.dropdownService.getInstitutions()
      .subscribe((res) => {
        this.institutionList = res.data;
      });
  }

  ngOnInit() {
// this.fetchInstitutionList();
  }
  save() {
    this.loadingBar.start();
    this.btnLoader.displayLoader();
    this.inputFields.comments = this.form.get('code').value;
    this.inputFields.id = this.formData.id
    // this.inputFields.statustypeid = this.formData.statustypeid;
    this.inputFields.description = this.form.get('description').value;
    // this.inputFields.institutionid = this.form.get('institution').value;
    return this.service.updateReason(this.inputFields)
    .subscribe(({ message, data}) => {
      
      if (message === 'Success' || 'Operation Successful') {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        this.snackbar.open('Reason Updated Successful', 'Dismiss', {
          panelClass: ['success'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return this.dialogref.close();
      } else {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        return this.snackbar.open('Reason Updated Failed', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    }, err => {
      this.loadingBar.complete();
      this.btnLoader.hideLoader();
      return this.snackbar.open('Reason Update failed please check input and try again', 'Dismiss', {
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
