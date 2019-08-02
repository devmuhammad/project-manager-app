
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBarRef, MatSnackBar } from '@angular/material';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { LoadingBarComponent, LoadingBarService } from '@ngx-loading-bar/core';
import { ProjectService } from 'src/app/services/project.service';
import { DropdownsService } from 'src/app/services/dropdowns.service';

@Component({
  selector: 'app-create-project-type-modal',
  templateUrl: './create-project-type-modal.component.html',
  styleUrls: ['./create-project-type-modal.component.css']
})
export class CreateProjectTypeModalComponent implements OnInit {

  form: FormGroup;
  public projectType = {
    code: '',
    description: '',
    statustypeid: 0 as number ,
    institutionid: 0 as number,
  };
  institutionList: any[];
  view: boolean;
  inputType: string;
  vpasswordType: string;
  show: boolean;
   groups: string;
  constructor(
    private dialogRef: MatDialogRef<CreateProjectTypeModalComponent>,
    private fb: FormBuilder,
    private btnLoader: AngularButtonLoaderService,
    private loadingBar: LoadingBarService,
    private snackbar: MatSnackBar,
    private dropdownService: DropdownsService,
    private service: ProjectService
    ) {
      this.form = this.fb.group({
        code: ['', Validators.required],
        institution: ['', Validators.required],
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
      this.projectType.code = this.form.get('code').value;
      this.projectType.description = this.form.get('description').value;
      this.projectType.institutionid = this.form.get('institution').value;
      console.log(this.projectType);
      this.btnLoader.displayLoader();
      this.loadingBar.start();
      this.service.addProjectType(this.projectType)
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
          return this.snackbar.open('Failed to Create new Project Type\'', 'Dismiss', {
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

 
  saveAndAdd() {
    if(this.form.valid){
    this.projectType.code = this.form.get('code').value;
    this.projectType.description = this.form.get('description').value;
    this.projectType.institutionid = this.form.get('institution').value;
    this.btnLoader.displayLoader();
    this.service.addProjectType(this.projectType)
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
        return this.snackbar.open('Failed to Create Project Type\'', 'Dismiss', {
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
