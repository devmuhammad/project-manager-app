import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { MatSnackBar } from '@angular/material';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';

@Component({
  selector: 'app-resetuserpassword',
  templateUrl: './resetuserpassword.component.html',
  styleUrls: ['./resetuserpassword.component.css']
})
export class ResetuserpasswordComponent implements OnInit {

  constructor( 
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private reset: AuthserviceService,
    private btnLoader: AngularButtonLoaderService,
    private loadingBar: LoadingBarService,
    private routerHelper: DefaultlayoutService
    ) { }
  form: FormGroup;
  passwordFormGroup: FormGroup;
  flip: boolean;
  ngOnInit() {
    this.flip = false;
    this.form = this.fb.group({username: ['', Validators.required]});
    // this.passwordFormGroup = this.fb.group({
    //   password: ['', Validators.required],
    //   confirmPassword: ['', Validators.required]
    // });
  }

  resetpassword() {
    if (this.form.valid) {
      console.log(this.form.invalid);
      this.loadingBar.start();
      this.btnLoader.displayLoader();
      const username = this.form.get('username').value;
      return this.reset.resetPassword(username)
      .subscribe(response => {
        console.log(response);
        if (response.message === 'Success') {
          this.flip = true;
          this.loadingBar.complete();
          this.btnLoader.hideLoader();
          const message = response['data'];
          return this.snackBar.open(message, 'Dismiss', {
            duration: 7000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left',
            panelClass: ['success']
          });
        }
        if(response.message === "Failed"){
          this.loadingBar.complete();
          this.btnLoader.hideLoader();
          const message = response['data'];
          return this.snackBar.open(message, 'Dismiss', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left',
            panelClass: ['error']
          });
        }
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        return this.snackBar.open('Network Failed', 'Dismiss', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
          panelClass: ['error']
        });
      });
    }else{
      return this.snackBar.open("Invalid Input", 'Dismiss', {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
        panelClass: ['warning']
      });
    }
  }
  gotoPath(path) {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
    this.routerHelper.navigateToPath(path);
  }
}
