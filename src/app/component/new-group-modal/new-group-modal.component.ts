

import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { getLocaleDateFormat } from '@angular/common';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { DType } from '../auth/signup/signup.component';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';

@Component({
  selector: 'app-new-group-modal',
  templateUrl: './new-group-modal.component.html',
  styleUrls: ['./new-group-modal.component.css']
})
export class NewGroupModalComponent implements OnInit {
  form: FormGroup;
  designationList: DType[];
  institutionList: [];
  view: boolean;
  inputType: string;
  vpasswordType: string;
  show: boolean;
   groups: string;
  constructor(
    private fb: FormBuilder,
    private btnLoader: AngularButtonLoaderService,
    // private groupService: DropdownsService,
    private dropdownService: DropdownsService,
    private loadingBar: LoadingBarService,
    private groupService: DropdownsService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<NewGroupModalComponent>
    ) {
      this.form = this.fb.group({
        name: ['', Validators.required],
      });
     }

  ngOnInit() {
    this.inputType = this.vpasswordType = 'password';
    // this.fetchDesignationList();
    // this.fetchInstitutionList();
  }
  save() {
    this.groups = this.form.get('name').value;
    console.log(this.groups);
    this.btnLoader.displayLoader();
    this.loadingBar.start();
    this.groupService.addNewGroup(this.groups)
    .subscribe(({message, data, meta}) => {
      if (message === 'Success') {
        this.btnLoader.hideLoader();
        this.loadingBar.stop();
        this.dialogRef.close(this.form.value);
        return this.snackbar.open(`${message }:  Add  ${data[0].name} Group`, 'Dismiss', {
          panelClass: ['success'],
          duration: 7000,
          direction: 'rtl'
        });
      }
      if (message === 'Failed') {
        this.btnLoader.hideLoader();
        this.loadingBar.stop();
        return this.snackbar.open('Failed to Create new Group\'', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          direction: 'rtl'
        });
      }
    }, err => {
      console.log(err);
      this.btnLoader.hideLoader();
      this.loadingBar.stop();
      return this.snackbar.open('Operation Error', 'Dismiss', {
        panelClass: ['error'],
        duration: 7000,
        direction: 'rtl'
      });
    });
  }

  saveAndAdd() {
    this.btnLoader.displayLoader();
    this.groups = this.form.get('name').value;
    console.log(this.groups);
    this.groupService.addNewGroup(this.groups)
    .subscribe(({message, data, meta}) => {
      if (message === 'Success') {
        this.btnLoader.hideLoader();
        this.loadingBar.stop();
        this.form.reset();
        return this.snackbar.open(`${message } ${data[0].name}`, 'Dismiss', {
          panelClass: ['success'],
          duration: 7000,
          direction: 'rtl'
        });
      }
      if (message === 'Failed') {
        this.btnLoader.hideLoader();
        this.loadingBar.stop();
        return this.snackbar.open('Failed to Create new Group\'', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          direction: 'rtl'
        });
      }
    }, err => {
      console.log(err);
      this.btnLoader.hideLoader();
      this.loadingBar.stop();
      return this.snackbar.open('Operation Error', 'Dismiss', {
        panelClass: ['error'],
        duration: 7000,
        direction: 'rtl'
      });
    });
  }

  fetchDesignationList() {
    this.dropdownService.getDesignations()
      .subscribe((res) => {
        this.designationList = res.data;
        console.log(this.designationList);
      }
      );
  }
  toggleView() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
    this.view = !this.view;
    if (this.view === true) { return this.inputType = 'text'; }
    return this.inputType = 'password';
  }
  toggleShow() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
    this.show = !this.show;
    if (this.show === true) { return this.vpasswordType = 'text'; }
    return this.vpasswordType = 'password';
  }


close() {
    this.dialogRef.close();
  }
}
