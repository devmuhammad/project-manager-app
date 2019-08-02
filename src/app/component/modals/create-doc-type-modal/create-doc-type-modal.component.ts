


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBarRef, MatSnackBar } from '@angular/material';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { LoadingBarComponent, LoadingBarService } from '@ngx-loading-bar/core';
import { ProjectService } from 'src/app/services/project.service';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-create-doc-type-modal',
  templateUrl: './create-doc-type-modal.component.html',
  styleUrls: ['./create-doc-type-modal.component.css']
})
export class CreateDocTypeModalComponent implements OnInit {

  form: FormGroup;
  public projectType = {
    description: '',
    parentid: 0 as number,
  };
  institutionList: any[];
  view: boolean;
  inputType: string;
  vpasswordType: string;
  show: boolean;
   groups: string;
  constructor(
    private dialogRef: MatDialogRef<CreateDocTypeModalComponent>,
    private fb: FormBuilder,
    private btnLoader: AngularButtonLoaderService,
    private loadingBar: LoadingBarService,
    private snackbar: MatSnackBar,
    private dropdownService: DropdownsService,
    private service: ActivityService
    ) {
      this.form = this.fb.group({
        parent: ['', Validators.required],
        description: ['', Validators.required],
      });
     }
     fetchInstitutionList() {
      this.dropdownService.getInstitutions()
        .subscribe((res) => {
          this.institutionList = res.data;
          console.log(this.institutionList);
        });
    } 
  ngOnInit() {
    this.fetchInstitutionList();
  }

  save() {
    if (this.form.valid) {

      this.projectType.description = this.form.get('description').value;
      this.projectType.parentid = this.form.get('parent').value;
      console.log(this.projectType);
      this.btnLoader.displayLoader();
      this.loadingBar.start();
      this.service.addDocType(this.projectType)
      .subscribe(({message, data, meta}) => {
        if (message === 'Success') {
          console.log(message);
          console.log(data);
          this.btnLoader.hideLoader();
          this.loadingBar.stop();
          this.dialogRef.close(this.form.value);
          return this.snackbar.open(`${message }`, 'Dismiss', {
            panelClass: ['success'],
            duration: 7000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          });
        }
        if (message === 'Failed') {
          this.btnLoader.hideLoader();
          this.loadingBar.stop();
          return this.snackbar.open('Failed to Create new Document Type\'', 'Dismiss', {
            panelClass: ['error'],
            duration: 7000,
            horizontalPosition: 'right',
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
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      });
    }
  }

 
  saveAndAdd() {
    if(this.form.valid){
    this.projectType.description = this.form.get('description').value;
    this.projectType.parentid = this.form.get('parent').value;
    this.btnLoader.displayLoader();
    this.service.addDocType(this.projectType)
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
        return this.snackbar.open('Failed to Create Document Type\'', 'Dismiss', {
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
