import { Component, OnInit, Inject } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import {  MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ActivityService } from 'src/app/services/activity.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-document-update',
  templateUrl: './document-update.component.html',
  styleUrls: ['./document-update.component.css']
})
export class DocumentUpdateComponent implements OnInit {
  public queryParam = {
    datefrom: '',
    dateto: '',
    enddate: '',
    institutionId: '',
    sFilter: '',
    page: 0,
    size: 20,
  };
  public formInputs = {
    activityid: 0 as number,
    description: '',
    documentid: 0 as number,
    documenttypeid: 0 as number,
    docurl: '',
    projectid: 0 as number,
    receivedfrom: '',
    receivedby: '',
  };
  docxData: any;
  projectList: any[];
  docTypeList: any[];
  files: any = [];
  fileColumns = ['File Name', 'Actions'];
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private row: any,
    private projectservice: ProjectService,
    private loadingBar: LoadingBarService,
    private btnLoader: AngularButtonLoaderService,
    private activityservice: ActivityService,
    private docservice: DocumentsService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogref: MatDialogRef<DocumentUpdateComponent>
  ) {
    console.log(this.row.data);
    this.docxData = this.row.data;
    console.log(this.docxData);
    this.form = this.fb.group({
      description: [this.docxData.description, Validators.required],
      projectid:[this.docxData.projectid, Validators.required],
      documenttypeid: [this.docxData.documenttypeid, Validators.required],
      docurl: [this.docxData.docurl, Validators.required],
      receivedby: [this.docxData.receivedby, Validators.required],
      receivedfrom: [this.docxData.receivedfrom, Validators.required],
    });
  }
  getDocType() {
    this.activityservice.getdocumentType()
      .subscribe((response) => {
        if (response.message === 'Success') {
         
          this.docTypeList = response.data.map(item => {
            console.log({...item})
            return { ...item };
          });
        }
      });
  }

  doNothing() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
  }

  getProjectList() {
    this.projectservice.getProjectList(this.queryParam)
      .subscribe(response => {
        if (response.message === 'Success') {
          this.projectList = response.data.map(item => {
            return { ...item };
          });
          console.log(this.projectList);
        }
      });
  }
  ngOnInit() {
    this.getProjectList();
    this.getDocType();
  }

  attatchFile(event) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element);
    }
    console.log(this.files);
  }

  getErrorNotification(message) {
    this.btnLoader.hideLoader();
    this.loadingBar.complete();
    return this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error']
    });
  }
  getSuccessNotification(message) {
    this.btnLoader.hideLoader();
    // this.form.reset();
    this.loadingBar.complete();
    return this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['success']
    });
  }

  updateDocument(formdata){
    this.docservice.updateDocument(formdata)
    .subscribe(res=>{
      if(res.message ==='Success'){
      return  this.getSuccessNotification("Document Updated Successfully");
      }
      this.getErrorNotification("Document Update Failed");
    },err=>{this.getErrorNotification(`Document Update Failed`)})
  }
  update(){
    this.loadingBar.start();
    this.btnLoader.displayLoader();
    this.formInputs.activityid = this.docxData.activityid;
    this.formInputs.description = this.form.get('description').value;
    this.formInputs.documentid = this.docxData.documentid;
    this.formInputs.projectid = this.form.get('projectid').value;
    this.formInputs.docurl = this.files ? this.files[0].url : this.form.get('docurl').value;
    this.formInputs.receivedfrom = this.form.get('receivedfrom').value;
    this.formInputs.receivedby = this.form.get('receivedby').value;
    this.formInputs.documenttypeid = this.form.get('documenttypeid').value;
    this.updateDocument(this.formInputs);
  }

  close() {
    this.dialogref.close();
  }
  deleteAttachment(index) {
    this.files.splice(index, 1);
  }
}
