import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.css']
})

export class CreateProjectModalComponent implements OnInit {
  form: FormGroup;
  detail_desc:string;

  currentDate=''
   format = 'dd/MM/yyyy';


  types = [
    {id:1,name:'Software project'},
    {id:2,name:'Training'},
    {id:3,name:'Journal'},
    {id:4,name:'Contract'}
  ];

  status = [
    {id:1,name:'Todo'},
    {id:2,name:'In progress'},
    {id:3,name:'Completed'},
    {id:4,name:'Suspended'}
  ];

  constructor(
    private fb: FormBuilder,
    private service: ProjectService,
    private dialogRef: MatDialogRef<CreateProjectModalComponent>) {
    }

    getCurrentDate(){
       var today=new Date();
      this.currentDate = today.toDateString();
      console.log(this.currentDate)
      return this.currentDate
    }
  ngOnInit() {
    this.getCurrentDate();
  }

  save() {
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}
}
