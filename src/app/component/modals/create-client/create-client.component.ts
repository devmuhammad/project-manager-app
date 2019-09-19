import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBarRef, MatSnackBar } from '@angular/material';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { LoadingBarComponent, LoadingBarService } from '@ngx-loading-bar/core';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  form: FormGroup;
  public clientsInputs = {
    businessname: '',
    code: '',
    email: '',
    institutionid: '',
    contactphonenumber: '',
    contactpersonemail: '',
    phonenumber: '',
    contactperson: '',
    weburl: '',
  };
  view: boolean;
  inputType: string;
  vpasswordType: string;
  show: boolean;
   groups: string;
  constructor(
    private dialogRef: MatDialogRef<CreateClientComponent>,
    private fb: FormBuilder,
    private btnLoader: AngularButtonLoaderService,
    private loadingBar: LoadingBarService,
    private snackbar: MatSnackBar,
    private service: ClientsService
    ) {
      this.form = this.fb.group({
        businessname: ['', Validators.required],
        code: ['', Validators.required],
        email: ['', Validators.required],
        contactperson: ['', Validators.required],
        contactpersonemail: ['', Validators.required],
        contactphonenumber: ['', Validators.required],
        phonenumber: ['', Validators.required],
        weburl: ['', Validators.required],

      });
     }

  ngOnInit() {
  }

  save() {
    if(this.form.valid){

      this.clientsInputs.businessname = this.form.get('businessname').value;
      this.clientsInputs.code = this.form.get('code').value;
      this.clientsInputs.email = this.form.get('email').value;
      this.clientsInputs.phonenumber = this.form.get('phonenumber').value;
      this.clientsInputs.contactperson = this.form.get('contactperson').value;
      this.clientsInputs.contactpersonemail = this.form.get('contactpersonemail').value;
      this.clientsInputs.contactphonenumber = this.form.get('contactphonenumber').value;
      this.clientsInputs.weburl = this.form.get('weburl').value;
      console.log(this.clientsInputs);
      this.btnLoader.displayLoader();
      this.loadingBar.start();
      this.service.addClients(this.clientsInputs)
      .subscribe(({message, data, meta}) => {
        if (message === 'Success') {
          this.btnLoader.hideLoader();
          this.loadingBar.stop();
          this.dialogRef.close(this.form.value);
          return this.snackbar.open(`${message }`, 'Dismiss', {
            panelClass: ['success'],
            duration: 7000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          });
        }
        if (message === 'Failed') {
          this.btnLoader.hideLoader();
          this.loadingBar.stop();
          return this.snackbar.open('Failed to Create new Group\'', 'Dismiss', {
            panelClass: ['error'],
            duration: 7000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });
        }
      }, err => {
        console.log(err);
        this.btnLoader.hideLoader();
        this.loadingBar.stop();
        return this.snackbar.open('Operation Error', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
      });
    }
  }

  saveAndAdd() {
    this.clientsInputs.businessname = this.form.get('businessname').value;
    this.clientsInputs.code = this.form.get('code').value;
    this.clientsInputs.email = this.form.get('email').value;
    this.clientsInputs.phonenumber = this.form.get('phonenumber').value;
    this.clientsInputs.contactperson = this.form.get('contactperson').value;
    this.clientsInputs.contactpersonemail = this.form.get('contactpersonemail').value;
    this.clientsInputs.contactphonenumber = this.form.get('contactphonenumber').value;
    this.clientsInputs.weburl = this.form.get('weburl').value;
    this.btnLoader.displayLoader();
    this.service.addClients(this.clientsInputs)
    .subscribe(({message, data, meta}) => {
      if (message === 'Success') {
        this.btnLoader.hideLoader();
        this.loadingBar.stop();
        this.form.reset();
        return this.snackbar.open(`${message } ${data[0].name}`, 'Dismiss', {
          panelClass: ['success'],
          duration: 7000,
          horizontalPosition:'left',
        verticalPosition: 'bottom',
        });
      }
      if (message === 'Failed') {
        this.btnLoader.hideLoader();
        this.loadingBar.stop();
        return this.snackbar.open('Failed to Create new Group\'', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          horizontalPosition:'left',
        verticalPosition: 'bottom',
        });
      }
    }, err => {
      console.log(err);
      this.btnLoader.hideLoader();
      this.loadingBar.stop();
      return this.snackbar.open('Operation Error', 'Dismiss', {
        panelClass: ['error'],
        duration: 7000,
        horizontalPosition:'left',
        verticalPosition: 'bottom',
      });
    });
  }

  close() {
    this.dialogRef.close();
  }
}
