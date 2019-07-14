import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlDirective, NgForm, FormGroupDirective } from '@angular/forms';
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { SignupService } from 'src/app/services/signup.service';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { map } from 'rxjs/operators';

export interface DType {
  designationid: number;
  description: string;
}
export interface InstitutionType {
  institutionId: number;
  flag: number;
  institutionCode: number;
  institutionName: string;
  institutionType: {
    institutionTypeId: number;
    institutionTypeName: string;
  }
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    // const invalidParent = !!(control && control.pristine && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl);
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  designationList: DType[];
  institutionList: [];
  view: boolean;
  inputType: string;
  vpasswordType: string;
  show: boolean;
  matcher = new MyErrorStateMatcher();
  constructor(
    private btnLoader: AngularButtonLoaderService,
    private routerHelper: DefaultlayoutService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dropdownService: DropdownsService,
    private signUpService: SignupService,
    private loadingBar: LoadingBarService,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      verifyPassword: [''],
      contactemail: ['', Validators.required],
      designationId: ['', Validators.required],
      fullname: ['', Validators.required],
      institutionId: ['', Validators.required],
      phone: ['', Validators.required]
    }, {validator: this.checkPasswords });
  }

  public signupData = {
    username: '',
    password: '',
    fullname: '',
    contactemail: '',
    institutionId: '',
    designationid: '',
    phone: '',
  };
  fetchDesignationList() {
    this.dropdownService.getDesignations()
      .subscribe((res) => {
        this.designationList = res.data;
        console.log(this.designationList);
      }
      );
  }

  fetchInstitutionList() {
    this.dropdownService.getInstitutions()
      .subscribe((res) => {
        this.institutionList = res.data;
        console.log(this.institutionList);
      });
  }
  ngOnInit() {
    this.inputType = this.vpasswordType = 'password';
    this.fetchDesignationList();
    this.fetchInstitutionList();
    
  }

  gotoPath() {
    this.routerHelper.navigateToPath('/login');
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  const pass = group.controls.password.value;
  const confirmPass = group.controls.verifyPassword.value;

  return pass !== '' && pass === confirmPass ? null : { notSame: true };
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
  getSignUp() {
    this.btnLoader.displayLoader();
    // tslint:disable-next-line: deprecation
    event.preventDefault();
    if (this.form.valid) {
      this.loadingBar.start();
      this.signupData.fullname = this.form.get('fullname').value;
      this.signupData.username = this.form.get('username').value;
      this.signupData.institutionId = this.form.get('institutionId').value;
      this.signupData.password = this.form.get('password').value;
      this.signupData.designationid = this.form.get('designationId').value;
      this.signupData.phone = this.form.get('phone').value;
      this.signupData.contactemail = this.form.get('contactemail').value;
      return this.signUpService.signup(this.signupData)
      .subscribe(response => {
        console.log(response);
        if (response && response.message === 'Success') {
          this.btnLoader.hideLoader();
          this.loadingBar.complete();
          this.form.reset();
          const message = response['data'];
          return this.snackBar.open(message, 'Dismiss', {
            duration: 7000,
            direction: 'rtl',
            panelClass: ['success']
          });
        }
        if (response.status === 406) {
          this.btnLoader.hideLoader();
          this.loadingBar.complete();
          return  this.snackBar.open('Data not acceptable', 'Dismiss', {
            duration: 4000,
            direction: 'rtl',
            panelClass: ['error']
          });
        }
        if (response.status === 401) {
          this.btnLoader.hideLoader();
          this.loadingBar.complete();
          return  this.snackBar.open('Unauthorized user', 'Dismiss', {
            duration: 4000,
            direction: 'rtl',
            panelClass: ['error']
          });
        } else {
          this.btnLoader.hideLoader();
          this.loadingBar.complete();
          return this.snackBar.open('Network Failed', 'Dismiss', {
            duration: 4000,
            direction: 'rtl',
            panelClass: ['error']
          });
        }
      }),err => {
        console.log(err);
        return this.snackBar.open('Sign up failed Please try again', 'Dismiss', {
          duration: 5000,
          direction: 'rtl',
          panelClass: ['error']
        });
      };
  } else {
    return this.loadingBar.complete();
  }
}
}
