import { Component, OnInit, ViewChild } from '@angular/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { DocumentsService } from 'src/app/services/documents.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { ActivityService } from 'src/app/services/activity.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-document-container',
  templateUrl: './document-container.component.html',
  styleUrls: ['./document-container.component.css']
})


export class DocumentContainerComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['#', 'url', 'doctype', 'createdat', 'reciever', 'sender', 'action'];
  fileColumns = ['File Name', 'Actions'];
  constructor(private commonservice: DefaultlayoutService,
    private loadingBar: LoadingBarService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dropdownService: DropdownsService,
    private btnLoader: AngularButtonLoaderService,
    private activityservice: ActivityService,
    private projectservice: ProjectService,
    private documentservice: DocumentsService) {
    this.form = this.fb.group({
      activityid: ['', Validators.required],
      documenttypeid: ['', Validators.required],
      projectid: ['', Validators.required],
      description: ['', Validators.required],
      receivedby: ['', Validators.required],
    });
  }
  public credentials = {
    page: 0, institutionId: 1, size: 20, sFilter: '', dateto: '', datefrom: ''
  };

  public queryParam = {
    datefrom: '',
    dateto: '',
    enddate: '',
    institutionId: '',
    sFilter: '',
    page: 0,
    size: 20,
  };
  public inputFields = {
    receivedby: '',
    receivedfrom: '',
    docurl: '',
    description: '',
    projectid: 0 as number,
    activityid: '',
    documenttypeid: 0 as number,


  };
  flag = -1;
  docTypeList: any;
  institutionList: any;
  form: FormGroup;
  getFile: any;
  files: any = [];
  documentList = [];
  dataSource: MatTableDataSource<any>;
  searchKey: '';
  projectList: '';
  resizeName = (initialName) => {
    const length = 20;
    const append = '..';
    let newName = initialName;
    if (typeof newName === 'string') {
      if (newName.length > length) {
        return newName = initialName.substring(0, length - append.length) + append;
      } else {
        return newName;
      }

    } else {
      if (Object.keys(newName).length > length) {
        return newName = initialName.substring(0, length - append.length) + append;
      } else {
        return newName;
      }
    }

  }
  getProjectList() {
    this.projectservice.getProjectList(this.queryParam)
      .subscribe(response => {
        if (response.message === 'Success') {
          this.loadingBar.complete();
          this.projectList = response.data.map(item => {
            return { ...item };
          });
          console.log(this.projectList);
        }
      });
  }
  fetchInstitutionList() {
    this.dropdownService.getInstitutions()
      .subscribe((res) => {
        this.institutionList = res.data;
      });
  }
  getDocType() {
    this.activityservice.getdocumentType()
      .subscribe((response) => {
        if (response.message === 'Success') {
          this.loadingBar.complete();
          this.docTypeList = response.data.map(item => {
            // console.log({ ...item });
            return { ...item };
          });
        }
      });
  }
  getFileExt(file) {
    const extToArray = [...file];
    const extension = file.substring(extToArray.indexOf('.'));
    return extension;
  }
  getList(credentials) {
    this.loadingBar.start();
    return this.documentservice.getDocumentList(credentials)
      .subscribe(res => {
        console.log(res);
        if (res.message === 'Success') {
          this.loadingBar.complete();
          this.documentList = res.data.map((item: any) => {
            const fileExt = this.getFileExt(item.docurl);
            const name = this.resizeName(item.docurl);
            // console.log({ ...item, fileExt });
            return { ...item, fileExt, name };
          });
          this.dataSource = new MatTableDataSource(this.documentList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }, err => {
        this.loadingBar.complete();
        this.snackBar.open('Network Failed: You are offline', 'Dismiss',
          {
            duration: 7000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['error']
          });
        console.log(err);
      });
  }
  ngOnInit() {
    this.getList(this.credentials);
    this.fetchInstitutionList();
    this.getDocType();
    this.getProjectList();
    this.commonservice.handleBreadChrome({ parent: 'Document', child: 'Activities' });
  }

  getErrorNotified(message) {
    this.btnLoader.hideLoader();
    this.loadingBar.complete();
    return this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error']
    });
  }
  getSuccessNotified(message) {
    this.btnLoader.hideLoader();
    this.form.reset();
    this.loadingBar.complete();
    return this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['success']
    });
  }
  attatchFile(event) {
    console.log(event);
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);
    }
  }

  uploadIteratedfiles(payload) {
    console.log(payload);
    this.documentservice.addDocument(payload)
      .subscribe(res => {
        if (res.message === 'Success') { this.flag = 1; }
      }, err => { this.flag = 0; });
    if (this.flag == 1) {
      this.getList(this.credentials);
      return this.getSuccessNotified('New Document Added');
    }
    if (this.flag == 0) {
      return this.getErrorNotified(`File failed to upload`);
    }
  }

  uploadfiles() {
    this.btnLoader.displayLoader();
    this.loadingBar.start();
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (this.files.length) {
      for (const item of this.files) {
        // console.log(item);
        this.inputFields.activityid = this.form.get('activityid').value;
        this.inputFields.description = this.form.get('description').value;
        this.inputFields.documenttypeid = this.form.get('documenttypeid').value;
        this.inputFields.docurl = item;
        this.inputFields.receivedfrom = profile.fullname;
        this.inputFields.receivedby = this.form.get('receivedby').value;
        this.inputFields.projectid = this.form.get('projectid').value;
        this.uploadIteratedfiles(this.inputFields);
      }

    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

  deleteDocx(id: number) {
    this.loadingBar.start();
    this.documentservice.deleteDocx(id)
      .subscribe(res => {
        if (res.message === 'Success') {
          this.getSuccessNotified('Document Deleted Successfully');
          return this.getList(this.credentials);
        }
        this.getErrorNotified('Document Failed to delete');
      }, err => this.getErrorNotified('Document Failed to delete'));
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

}
