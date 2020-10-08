



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBarRef, MatSnackBar } from '@angular/material';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { LoadingBarComponent, LoadingBarService } from '@ngx-loading-bar/core';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { ReasonService } from 'src/app/services/reason.service';

@Component({
  selector: 'app-create-reason',
  templateUrl: './create-reason.component.html',
  styleUrls: ['./create-reason.component.css']
})
export class CreateReasonComponent implements OnInit {

  form: FormGroup;
  public statusInputs = {
    comments: '',
    description: '',
  };
  institutionList: any[];
  view: boolean;
  inputType: string;
  vpasswordType: string;
  show: boolean;
   groups: string;
  constructor(
    private dialogRef: MatDialogRef<CreateReasonComponent>,
    private fb: FormBuilder,
    private btnLoader: AngularButtonLoaderService,
    private loadingBar: LoadingBarService,
    private snackbar: MatSnackBar,
    private dropdownService: DropdownsService,
    private service: ReasonService
    ) {
      this.form = this.fb.group({
        code: ['', Validators.required],
        // institution: ['', Validators.required],
        description: ['', Validators.required],
      });
     }
     
  ngOnInit() {
    this.fetchInstitutionList();
  }
  doNothing() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
  }

  save() {
    if(this.form.valid){
      this.statusInputs.comments = this.form.get('code').value;
      this.statusInputs.description = this.form.get('description').value;
      this.btnLoader.displayLoader();
      this.loadingBar.start();
      this.service.addReason(this.statusInputs)
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
          return this.snackbar.open('Failed to Create new Reason\'', 'Dismiss', {
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

  fetchInstitutionList() {
    this.dropdownService.getInstitutions()
      .subscribe((res) => {
        this.institutionList = res.data;
        console.log(this.institutionList);
      });
  }
  saveAndAdd() {
    if(this.form.valid){
    this.statusInputs.comments = this.form.get('code').value;
    this.statusInputs.description = this.form.get('description').value;
    // this.statusInputs.institutionid = this.form.get('institution').value;
    this.btnLoader.displayLoader();
    this.service.addReason(this.statusInputs)
    .subscribe(({message, data, meta}) => {
      if (message === 'Success') {
        this.btnLoader.hideLoader();
        this.loadingBar.stop();
        this.form.reset();
        return this.snackbar.open(`${message } `, 'Dismiss', {
          panelClass: ['success'],
          duration: 7000,
          horizontalPosition:'left',
        verticalPosition: 'bottom',
        });
      }
      if (message === 'Failed') {
        this.btnLoader.hideLoader();
        this.loadingBar.stop();
        return this.snackbar.open('Failed to Create Reason\'', 'Dismiss', {
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
}

  close() {
    this.dialogRef.close();
  }
}
