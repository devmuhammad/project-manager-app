







import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { DropdownsService } from 'src/app/services/dropdowns.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  form: FormGroup;
  client: object;
  formData: any;
  isLoading: boolean;
  fetchmessage: any;
  public inputFields = {
    id: 0 as number,
    name: '',
   contactphone: '',
   contactemail: '',
   contactperson: '',
   weburl: '',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) private row: any,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private snackbar: MatSnackBar,
    private roleService: DropdownsService,
    private btnLoader: AngularButtonLoaderService,
    private dialogref: MatDialogRef<UpdateClientComponent>) {
    this.formData = this.row.data;
    // this.groupData = this.row.details;
    this.form = this.fb.group({
      name: [this.formData.name, Validators.required],
      contactemail: [this.formData.contactemail, Validators.required],
      contactperson: [this.formData.contactperson, Validators.required],
      contactphone: [this.formData.contactphone, Validators.required],
      weburl: [this.formData.weburl, Validators.required],
    });
  }


  ngOnInit() {

  }
  save() {
    this.loadingBar.start();
    this.btnLoader.displayLoader();
    this.inputFields.name = this.form.get('name').value;
    this.inputFields.id = this.formData.id;
    this.inputFields.contactemail = this.form.get('contactemail').value;
    this.inputFields.contactperson = this.form.get('contactperson').value;
    this.inputFields.contactphone = this.form.get('contactphone').value;
    this.inputFields.weburl = this.formData.get('weburl').value;
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
