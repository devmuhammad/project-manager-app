import { Component, OnInit, ViewChild } from '@angular/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { DocumentsService } from 'src/app/services/documents.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { ActivityService } from 'src/app/services/activity.service';
import { ProjectService } from 'src/app/services/project.service';
import { UsersService } from 'src/app/services/users.service';
import { DocumentUpdateComponent } from '../document-update/document-update.component';

@Component({
  selector: 'app-document-container',
  templateUrl: './document-container.component.html',
  styleUrls: ['./document-container.component.css']
})


export class DocumentContainerComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
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
              private dialog: MatDialog,
              private users: UsersService,
              private documentservice: DocumentsService) {
    this.form = this.fb.group({
      activityid: ['', Validators.required],
      documenttypeid: ['', Validators.required],
      projectid: ['', Validators.required],
      receivedfrom: ['', Validators.required],
      description: ['', Validators.required],
      taskid: ['', Validators.required],
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
    userId: '',
    receivedfrom: '',
    file: null,
    parentId: 0 as number,
    taskId: '',
    description: '',
    projectId: 0 as number,
    activityId: '',
    doctypeId: 0 as number,


  };
  flag = null;
  docTypeList: any;
  institutionList: any;
  form: FormGroup;
  getFile: any;
  allusers: any;
  grid: any;
  files: any = [];
  documentList = [];
  searchKey: '';
  projectList: '';
  resizeName = (initialName) => {
    if (initialName) {
      const length = 20;
<<<<<<< HEAD
      const append = '...';
=======
      const append = '..';
>>>>>>> 72d63fa81ca5ce7ec7b3ad21feec0b2073cce19b
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

  doNothing() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
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
            const fileExt = this.getFileExt(item.docurl ? item.docurl : 'picture.png');
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
    const profile = JSON.parse(localStorage.getItem('profile'));
    this.getList(this.credentials);
    this.fetchInstitutionList();
    this.getUsers(profile.id);
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
  attatchFile(event : FileList) {
    this.inputFields.file = event.item(0);
    console.log(event.item(0))
    this.files.push(event.item(0));
  }

  uploadIteratedfiles(payload) {
    console.log(payload);
    this.documentservice.uploadDocument(payload)
      .subscribe(res => {
        if (res.message === 'Success') {return this.getSuccessNotified('New Document Added') }
        this.getErrorNotified("Something went wrong");
        this.flag =1;
      }, err => {
        console.log(err.error)
        this.flag =0;
        const error = err.error.error;
        return this.getErrorNotified(`File failed to upload ${error}`);
      });
    console.log(this.flag);
  }

  getUsers(id: number) {
    return this.users.userList(id)
      .subscribe((res: any) => {
        console.log(res);
        this.allusers = res.data.map((item: any) => ({
          ...item
        }));
      });
  }

  uploadfiles() {
    this.btnLoader.displayLoader();
    this.loadingBar.start();
    const profile = JSON.parse(localStorage.getItem('profile'));
    // if (this.files) {
      // for (const item of this.files) {
        // console.log(item);
    this.inputFields.activityId = this.form.get('activityid').value;
    this.inputFields.description = this.form.get('description').value;
    this.inputFields.doctypeId = this.form.get('documenttypeid').value;
    this.inputFields.taskId = this.form.get('taskid').value;
    this.inputFields.receivedfrom = this.form.get('receivedfrom').value;
    this.inputFields.userId = profile.id;
    this.inputFields.projectId = this.form.get('projectid').value;
    this.uploadIteratedfiles(this.inputFields);
      // }
      // if (this.flag == 1) {
      //   this.getList(this.credentials);
      //   return this.getSuccessNotified('New Document Added');
      // }
      // if (this.flag == 0) {
      //   return this.getErrorNotified(`File failed to upload`);
      // }

    // }
  }

  filePreview(id: number){
    this.loadingBar.start();
    const profile = JSON.parse(localStorage.getItem('profile'));
    const credential ={documentId:id, userId:profile.id};
    this.documentservice.DocumentPreview(credential)
    .subscribe(res=>{
      if(res.message === 'Success') {return this.getSuccessNotified(' Document Previewed')};

      this.getErrorNotified("Something went wrong");
      this.loadingBar.complete();
    }, error => {
      this.loadingBar.complete(); 
      console.log(error)
      const err = error.error.error;
      return this.getErrorNotified(`File failed  ${err}`);
    });
  }
  fileDownload(id: number){
    this.loadingBar.start();
    const profile = JSON.parse(localStorage.getItem('profile'));
    const credential ={documentId:id, userId:profile.id};
    this.documentservice.downloadfile(credential)
    .subscribe(res=>{
      if(res.message === 'Success') {return this.getSuccessNotified(' Document Downloaded')};

      this.getErrorNotified("Something went wrong");
      this.loadingBar.complete();
    }, error => {
      this.loadingBar.complete(); 
      console.log(error)
      const err = error.error.error;
      return this.getErrorNotified(`File failed to download ${err}`);
    });
  }
  getUpdateDocx(row) {
    console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = { data: row };
    this.dialog.open(DocumentUpdateComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.getList(this.credentials);
      }
    );
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


  // console.log(temp)
    // tslint:disable-next-line: prefer-for-of
    // for (let index = 0; index < event.length; index++) {
    //   const element = event[index];
    //   console.log(element);
    //   this.files.push(element);
    // }