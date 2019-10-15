




import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { DropdownsService } from 'src/app/services/dropdowns.service';

@Component({
  selector: 'app-update-group-modal',
  templateUrl: './update-group-modal.component.html',
  styleUrls: ['./update-group-modal.component.css']
})
export class UpdateGroupModalComponent implements OnInit {
  form: FormGroup;
  rolesList: object;
  groupData: any;
  isLoading: boolean;
  fetchmessage: any;
  public inputFields = {
    id: 0 as number,
    name: '',
    roles: [],
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) private row: any,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private snackbar: MatSnackBar,
    private roleService: DropdownsService,
    private btnLoader: AngularButtonLoaderService,
    private dialogref: MatDialogRef<UpdateGroupModalComponent>) {
    this.rolesList = this.row.roles;
    this.groupData = this.row.details;
    this.form = this.fb.group({
      name: [this.groupData.name, Validators.required],
      roletypes: [this.groupData.roletypes],
      roles: [this.groupData.roles],
    });
  }


  ngOnInit() {

  }
  save() {
    this.loadingBar.start();
    this.btnLoader.displayLoader();
    this.inputFields.name = this.form.get('name').value;
    this.inputFields.id = this.groupData.id;
    this.inputFields.roles = this.form.get('roles').value;
    console.log(this.inputFields);
    return this.roleService.updateGroup(this.inputFields)
    .subscribe(({ message, data}) => {
      console.log(message);
      console.log(data);
      if (message === 'Success' || 'Operation Successful') {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        this.snackbar.open('Group Updated Successful', 'Dismiss', {
          panelClass: ['success'],
          duration: 7000,
          direction: 'rtl'
        });
        return this.dialogref.close();
      } else {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        return this.snackbar.open('Group Updated Failed', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          direction: 'rtl'
        });
      }
    }, err => {
      this.loadingBar.complete();
      this.btnLoader.hideLoader();
      return this.snackbar.open('Group Update failed please check input and try again', 'Dismiss', {
        panelClass: ['error'],
        duration: 7000,
        direction: 'rtl'
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
