import { Component, OnInit,Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { ProjectService } from 'src/app/services/project.service';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-update-doctype-modal',
  templateUrl: './update-doctype-modal.component.html',
  styleUrls: ['./update-doctype-modal.component.css']
})
export class UpdateDoctypeModalComponent implements OnInit {

  form: FormGroup;
  client: object;
  formData: any;
  institutionList: [];
  isLoading: boolean;
  fetchmessage: any;
  public inputFields = {
    description: '',
    documentypeid: 0 as number,
    parentid: 0 as number,
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) private row: any,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private snackbar: MatSnackBar,
    private dropdownService: DropdownsService,
    private docService: ActivityService,
    private btnLoader: AngularButtonLoaderService,
    private dialogref: MatDialogRef<UpdateDoctypeModalComponent>) {
    this.formData = this.row.data;
    this.institutionList = this.row.institutions;
    this.form = this.fb.group({
      description: [this.formData.description, Validators.required],
      parent: [this.formData.parentid, Validators.required],
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
    this.inputFields.documentypeid = this.formData.documentypeid;
    this.inputFields.description = this.form.get('description').value;
    this.inputFields.parentid = this.form.get('parent').value;
    console.log(this.inputFields);
    return this.docService.updateDocumentTypes(this.inputFields)
    .subscribe(({ message, data}) => {
      console.log(message);
      console.log(data);
      if (message === 'Success' || 'Operation Successful') {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        this.snackbar.open('Document Type Updated Successful', 'Dismiss', {
          panelClass: ['success'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return this.dialogref.close();
      } else {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        return this.snackbar.open('Document Type Updated Failed', 'Dismiss', {
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
  close() {
    this.dialogref.close();
  }
}
