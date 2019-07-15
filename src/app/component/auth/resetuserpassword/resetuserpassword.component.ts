import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { MatSnackBar } from '@angular/material';
import { LoadingBarService } from '@ngx-loading-bar/core';

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
    private loadingBar: LoadingBarService,
    private routerHelper: DefaultlayoutService
    ) { }
  emailFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  flip: boolean;
  ngOnInit() {
    this.flip = false;
    this.emailFormGroup = this.fb.group({username: ['', Validators.required]});
    this.passwordFormGroup = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  resetpassword() {
    this.loadingBar.start();
    if (this.emailFormGroup.valid) { 
      const username = this.emailFormGroup.get('username').value;
      return this.reset.resetPassword(username)
      .subscribe(response => {
        console.log(response);
        if (response.message === 'Success') {
          this.flip = true;
          this.loadingBar.complete();
          this.loadingBar.stop();
          const message = response['data'];
          return this.snackBar.open(message, 'Dismiss', {
            duration: 7000,
            direction: 'rtl',
            panelClass: ['success']
          });
        }
        if(response.message === "Failed"){
          this.loadingBar.complete();
          const message = response['data'];
          return this.snackBar.open(message, 'Dismiss', {
            duration: 4000,
            direction: 'rtl',
            panelClass: ['error']
          });
        }
        this.loadingBar.complete();
        return this.snackBar.open('Network Failed', 'Dismiss', {
          duration: 4000,
          direction: 'ltr',
          panelClass: ['error']
        });
      });
    }
  }
  gotoPath(path) {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
    this.routerHelper.navigateToPath(path);
  }
}
