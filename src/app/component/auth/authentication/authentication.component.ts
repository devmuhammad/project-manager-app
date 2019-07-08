import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';
import {SPINNER } from 'ngx-ui-loader'
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { store } from 'src/app/store';
import { Router } from '@angular/router';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { style } from '@angular/animations';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor( private service:AuthserviceService,
    private toastr:ToastrService,
    private router:Router,
    private snackBar: MatSnackBar,
    private fb:FormBuilder) { }
view: boolean
inputType:string
form:FormGroup
formData:object[]
MAT_SNACK_BAR_DATA
public loginData={
  "username":'',
  "password":'',
}

toggleView(){
  event.preventDefault();
  this.view =!this.view
  if(this.view===true)return this.inputType='text';
  return  this.inputType='password';
}
  ngOnInit() {
    this.inputType='password'
    this.view= false
     this.form =this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
    })
  }

  getSignIn(form){
    event.preventDefault();
    if(this.form.valid){
  this.loginData.username =this.form.get('username').value;
       this.loginData.password = this.form.get('password').value;
       console.log(this.loginData)
      return this.service.login(this.loginData).subscribe(response=>{
        if(response && response['message']==="Success"){
          console.log(response)
          this.snackBar.open("Login Success", "Dismiss", {
            duration: 7000,
            direction: "ltr",
            panelClass:['success']
          });
          store.dispatch({type:'GET_PROFILE',payload:response['data']});
          localStorage.setItem('currentUser', JSON.stringify(response['password']+response['id']));
          localStorage.setItem('profile',JSON.stringify(response['data']))
          this.toastr.success("Login Success");
          return this.router.navigateByUrl('/dashboard');
        }else{
          this.snackBar.open("Login Failed", "Dismiss", {
            duration: 7000,
            direction: "rtl",
            panelClass:['error']
          });
        }
      })
    }else{
      this.snackBar.open("Invalid Username Or password", "Dismiss", {
        duration: 3000,
        direction: "rtl",
        panelClass:['warning']
      });
    }
  }
}

