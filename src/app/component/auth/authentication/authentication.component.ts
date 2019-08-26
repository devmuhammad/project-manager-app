import { Component, OnInit, DefaultIterableDiffer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { store } from 'src/app/store';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { AngularButtonLoaderService } from 'angular-button-loader';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private service: AuthserviceService,
              private routerHelper: DefaultlayoutService,
              private router: Router,
              private btnloader: AngularButtonLoaderService,
              private loadingBar: LoadingBarService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) { }
  view: boolean;
  inputType: string;
  form: FormGroup;
  formData: object[];
  MAT_SNACK_BAR_DATA;
  public loginData = {
    username: '',
    password: '',
  };
  doNothing() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
  }

  redirectRoute() {
    const authUser = JSON.parse(localStorage.getItem('profile'));
    console.log(authUser);
    if (authUser) { return this.routerHelper.navigateToPath('/project');}
    console.log('couldnt route');
  }
  gotoPath(path: string) {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
    this.routerHelper.navigateToPath(path);
  }
  toggleView() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
    this.view = !this.view;
    if (this.view === true) { return this.inputType = 'text'; }
    return this.inputType = 'password';
  }
  ngOnInit() {
    this.redirectRoute();
    this.inputType = 'password';
    this.view = false;
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  getSignIn() {
    event.preventDefault();
    if (this.form.valid) {
      this.loadingBar.start();
      this.btnloader.displayLoader();
      this.loginData.username = this.form.get('username').value;
      this.loginData.password = this.form.get('password').value;
      console.log(this.loginData);
      return this.service.login(this.loginData).subscribe(response => {
        if (response && response.message === 'Success') {
          console.log(response);
          store.dispatch({ type: 'GET_PROFILE', payload: response.data });
          localStorage.setItem('currentUser', JSON.stringify(response.password + response.id));
          localStorage.setItem('profile', JSON.stringify(response.data));
          console.log(localStorage.getItem('profile'));
          this.loadingBar.complete();
          this.btnloader.hideLoader();
          return this.router.navigateByUrl('/dashboard');
        } else {
          this.loadingBar.complete();
          this.btnloader.hideLoader();
          return this.snackBar.open('Login Failed', 'Dismiss', {
            duration: 7000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left',
            panelClass: ['error']
          });
        }
      });
    } else {
      this.snackBar.open('Invalid Username Or password', 'Dismiss', {
        duration: 3000,
        // direction: 'rtl',
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
        panelClass: ['warning']
      });
    }
  }
}

