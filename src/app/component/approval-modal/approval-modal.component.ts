import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { UsersService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-approval-modal',
  templateUrl: './approval-modal.component.html',
  styleUrls: ['./approval-modal.component.css']
})


export class ApprovalModalComponent implements OnInit {
groupList: any;
id: number;
form: FormGroup;
public inputFields = {
userid: 0 as number , groups: [], roletypes : '',
};
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private btnLoader: AngularButtonLoaderService,
    private userRequest: UsersService,
    private loadingBar: LoadingBarService,
    private snackbar: MatSnackBar,
    private dialogref: MatDialogRef<ApprovalModalComponent>,
    private fb: FormBuilder,
  ) {
    this.groupList = this.data.group;
    this.id = this.data.user;
    this.form = this.fb.group({
      roletypes: ['', Validators.required],
      groups: ['', Validators.required],
    });
  }
  ngOnInit() {
    console.log(this.groupList);
  }
  approveUser() {
    this.btnLoader.displayLoader();
    this.loadingBar.start();
    this.inputFields.userid = this.id;
    this.inputFields.roletypes = this.form.get('roletypes').value;
    this.inputFields.groups = this.form.get('groups').value;
    console.log(this.inputFields);
    this.userRequest.getUserApproval(this.inputFields)
    .subscribe(response=>{
      if(response.message == 'Operation Successful') {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        this.snackbar.open('User is Now Approved', 'Dismiss', {
          panelClass: ['success'],
          duration: 7000,
          direction: 'rtl'
        });
        return this.dialogref.close();
      } else {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        return this.snackbar.open('Failed to approve user', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          direction: 'rtl'
        });
      }
    }, err => {
      console.log(err);
      this.loadingBar.complete();
      this.btnLoader.hideLoader();
      return this.snackbar.open('Operation failed', 'Dismiss', {
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
