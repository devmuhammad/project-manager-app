



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBarRef, MatSnackBar } from '@angular/material';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { LoadingBarComponent, LoadingBarService } from '@ngx-loading-bar/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ProjectService } from 'src/app/services/project.service';
import { DropdownsService } from 'src/app/services/dropdowns.service';

@Component({
  selector: 'app-create-status-modal',
  templateUrl: './create-status-modal.component.html',
  styleUrls: ['./create-status-modal.component.css']
})
export class CreateStatusModalComponent implements OnInit {

  form: FormGroup;
  public statusInputs = {
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
    private dialogRef: MatDialogRef<CreateStatusModalComponent>,
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
     status = [
      { statustypeid: 1, description: 'Task' },
      { statustypeid: 2, description: 'Project' },
      { statustypeid: 3, description: 'Activities' },
      { statustypeid: 4, description: 'Personal' }
    ];
  ngOnInit() {
    this.fetchInstitutionList();
  }
  doNothing() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
  }

  save() {
    if(this.form.valid){
      this.statusInputs.code = this.form.get('code').value;
      this.statusInputs.description = this.form.get('description').value;
      this.statusInputs.institutionid = this.form.get('institution').value;
      console.log(this.statusInputs);
      this.btnLoader.displayLoader();
      this.loadingBar.start();
      this.service.addStatus(this.statusInputs)
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
          return this.snackbar.open('Failed to Create new Status\'', 'Dismiss', {
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
    this.statusInputs.code = this.form.get('code').value;
    this.statusInputs.description = this.form.get('description').value;
    this.statusInputs.institutionid = this.form.get('institution').value;
    this.btnLoader.displayLoader();
    this.service.addStatus(this.statusInputs)
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
        return this.snackbar.open('Failed to Create Status\'', 'Dismiss', {
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
