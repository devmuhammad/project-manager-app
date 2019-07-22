import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.component.html',
  styleUrls: ['./update-user-modal.component.css']
})
export class UpdateUserModalComponent implements OnInit {
  form: FormGroup;
  groups: object;
  userList: any;
  userData: any;
  isLoading: boolean;
  fetchmessage: any;
  public inputFields = {
    username: '',
    password: '',
    fullname: '',
    contactemail: '',
    supervisor: '',
    status: true,
    institutionid: '',
    designationid: '',
    phone: '',
    groups: [],
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) private row: any,
    private fb: FormBuilder,
    private userService: UsersService,
    private loadingBar: LoadingBarService,
    private snackbar: MatSnackBar,
    private btnLoader: AngularButtonLoaderService,
    private dialogref: MatDialogRef<UpdateUserModalComponent>) {
    this.groups = this.row.group;
    this.userData = this.row.data;
    this.form = this.fb.group({
      contactemail: [this.userData.contactemail, Validators.required],
      username: [this.userData.username, Validators.required],
      designation: [this.userData.desgnation, Validators.required],
      fullname: [this.userData.fullname, Validators.required],
      institution: [this.userData.institute, Validators.required],
      phone: [this.userData.phone, Validators.required],
      supervisor: [this.userData.supervisor, Validators.required],
      roletypes: [this.userData.roletypes],
      groups: [this.userData.groups],
      users: [this.userData.supervisor]
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.fetchmessage = 'Fetching supervisors...';
    const authUser = JSON.parse(localStorage.getItem('profile'));
    console.log(this.row);
    this.userService.userList(authUser.id)
      .pipe(map(res => res['data']))
      .subscribe(res => {
        this.isLoading = false;
        this.userList = res.filter((user: any) => user.id !== authUser.id);
      }, err => {
        this.fetchmessage = 'Unable to fetch Supervisors';
      }
      );
  }
  save() {
    this.loadingBar.start();
    this.btnLoader.displayLoader();
    this.inputFields.fullname = this.form.get('fullname').value;
    this.inputFields.username = this.form.get('username').value;
    // this.inputFields.institution = this.form.get('institution').value;
    // this.inputFields.designation = this.form.get('designation').value;
    this.inputFields.supervisor = this.form.get('supervisor').value;
    this.inputFields.phone = this.form.get('phone').value;
    this.inputFields.contactemail = this.form.get('contactemail').value;
    this.inputFields.groups = this.form.get('groups').value;
    console.log(this.inputFields);
    return this.userService.updateUser(this.inputFields)
    .subscribe(({meta, message, data}) => {
      console.log(message);
      console.log(data);
      if (message === 'Success' || 'Operation Successful') {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        this.snackbar.open('User Updated Successful', 'Dismiss', {
          panelClass: ['success'],
          duration: 7000,
          direction: 'rtl'
        });
        return this.dialogref.close();
      } else {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        return this.snackbar.open('User Updated Failed', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          direction: 'rtl'
        });
      }
    }, err => {
      this.loadingBar.complete();
      this.btnLoader.hideLoader();
      return this.snackbar.open('User Update failed please check input and try again', 'Dismiss', {
        panelClass: ['error'],
        duration: 7000,
        direction: 'rtl'
      });
    });
  }
  close() {
    this.dialogref.close();
  }
}
