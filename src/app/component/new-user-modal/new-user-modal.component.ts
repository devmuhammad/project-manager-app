import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { getLocaleDateFormat } from '@angular/common';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { DType } from '../auth/signup/signup.component';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.css']
})
export class NewUserModalComponent implements OnInit {
  form: FormGroup;
  designationList: DType[];
  institutionList: [];
  view: boolean;
  inputType: string;
  vpasswordType: string;
  show: boolean;
  constructor(
    private fb: FormBuilder,
    private dropdownService: DropdownsService,
    private dialogRef: MatDialogRef<NewUserModalComponent>
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
      });
     }

  ngOnInit() {
    this.inputType = this.vpasswordType = 'password';
    this.fetchDesignationList();
    this.fetchInstitutionList();
  }
  save() {
    this.dialogRef.close(this.form.value);
  }

  fetchDesignationList() {
    this.dropdownService.getDesignations()
      .subscribe((res) => {
        this.designationList = res.data;
        console.log(this.designationList);
      }
      );
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

  fetchInstitutionList() {
    this.dropdownService.getInstitutions()
      .subscribe((res) => {
        this.institutionList = res.data;
        console.log(this.institutionList);
      });
  }
close() {
    this.dialogRef.close();
  }
}
