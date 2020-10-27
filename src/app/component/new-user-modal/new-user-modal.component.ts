import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { getLocaleDateFormat } from '@angular/common';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { DType } from '../auth/signup/signup.component';
import { UsersService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';
import { LoadingBarComponent, LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';
@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.css']
})
export class NewUserModalComponent implements OnInit {
  form: FormGroup;
  designationList: DType[];
  institutionList: [];
  view: boolean;
  groupList: object;
  userList: any;
  inputType: string;
  vpasswordType: string;
  show: boolean;
  isLoading: boolean;
  fetchmessage: any;
  public inputFields = {
    username: '',
    password: '',
    fullname: '',
    contactemail: '',
    supervisor: '',
    status: true,
    roletypes: '',
    institutionid: 2 as number,
    designationid: 1 as number,
    phone: '',
    groups: [],
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private btnLoader: AngularButtonLoaderService,
    private userService: UsersService,
    private group: DropdownsService,
    private snackbar: MatSnackBar,
    private dropdownService: DropdownsService,
    private dialogref: MatDialogRef<NewUserModalComponent>
    ) {
      this.groupList = this.data.group;
      this.form = this.fb.group({
        contactemail: ['', Validators.required],
        username: [ '', Validators.required],
        password: ['', Validators.required],
        verifyPassword: [''],
        designation: ['', Validators.required],
        fullname: ['', Validators.required],
        institution: ['', Validators.required],
        phone: ['', Validators.required],
        roletypes: ['', Validators.required],
        supervisor: ['', Validators.required],
        groups: ['', Validators.required]
      });
     }

     getGroups() {
      this.group.getGroups().subscribe(res => {
        this.groupList = res.data.map(group => {
          return {...group};
        });
      });
      
    }
  ngOnInit() {
    this.inputType = this.vpasswordType = 'password';
    this.isLoading = true;
    this.fetchmessage = 'Fetching supervisors...';
    const authUser = JSON.parse(localStorage.getItem('profile'));
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

  doNothing() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
  }

  save() {
    this.loadingBar.start();
    this.btnLoader.displayLoader();
    this.inputFields.fullname = this.form.get('fullname').value;
    this.inputFields.username = this.form.get('contactemail').value;
    this.inputFields.password = this.form.get('password').value;
    // this.inputFields.institutionid = 0
    // this.inputFields.designationid = 1
    this.inputFields.supervisor = this.form.get('supervisor').value;
    this.inputFields.phone = this.form.get('phone').value;
    this.inputFields.contactemail = this.form.get('contactemail').value;
    this.inputFields.groups = this.form.get('groups').value;
    this.inputFields.roletypes = this.form.get('roletypes').value
    return this.userService.addNewUser(this.inputFields)
    .subscribe(({meta, message, data}) => {
      // console.log(message);
      // console.log(data);
      if (message === 'Failed') {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        return this.snackbar.open(`${message } ${data}`, 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          horizontalPosition:'right',
          verticalPosition:'bottom',
        });
      }
      if (message === 'Success' || 'Operation Successful') {
        console.log(data);
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        this.snackbar.open('New user added Successful', 'Dismiss', {
          panelClass: ['success'],
          duration: 7000,
          horizontalPosition:'right',
          verticalPosition:'bottom',
        });
        return this.dialogref.close();
      } else {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        return this.snackbar.open('Failed to create new user', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          horizontalPosition:'right',
          verticalPosition:'bottom',
        });
      }
    }, err => {
      this.loadingBar.complete();
      this.btnLoader.hideLoader();
      return this.snackbar.open(' Failed to create a new user please check input and try again', 'Dismiss', {
        panelClass: ['error'],
        duration: 7000,
        horizontalPosition:'right',
          verticalPosition:'bottom',
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

  fetchInstitutionList() {
    this.dropdownService.getInstitutions()
      .subscribe((res) => {
        this.institutionList = res.data;
        console.log(this.institutionList);
      });
  }
close() {
    this.dialogref.close();
  }
}
