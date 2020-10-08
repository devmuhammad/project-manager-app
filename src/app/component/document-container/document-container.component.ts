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
import { DocumentPreviewComponent } from '../modals/document-preview/document-preview.component';

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
  // activityService: any;
  taskList: any;
  docList: any[];
  allprojs: any;
  projSearch: any;
  usrDocs: any[];
  fileExt: any;
  docName: any;
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
      // activityid: ['', Validators.required],
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
  showFolders = true
  isAdmin = false
  currUser : any
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
    taskId: 0,
    description: '',
    projectId: 0 as number,
    activityId: 1,
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
  projectList = [];
  projSearchKey = '';

  resizeName = (initialName) => {
    if (initialName) {
      const length = 20;
      const append = '...';
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

  openFiles(proj){
    this.documentList = this.docList
    this.documentList = this.documentList.filter((el) => {
       return el.projectid == proj.projectId
    })
    this.usrDocs = this.documentList
    this.showFolders =!this.showFolders
  }

  getProjectList() {
    this.projectservice.getProjectList(this.queryParam)
      .subscribe(async response => {
        if (response.message === 'Success') {
          this.loadingBar.complete();
          
          const datarray = response.data.map(item => {
            return { ...item };
          });
          if (this.isAdmin){
            this.projectList = datarray
            this.allprojs = datarray
             this.loadingBar.complete();
  
              }else {
                const myprojects = []
  
               await datarray.forEach(async el => {
                 if (el.teamMemberCounts >= 1){
                  await this.projectservice.getProjectTeamMembers(el.projectId).subscribe(async ({data}) => {
                   
                    await data.forEach(async e => {
                     if(e.id === this.currUser.id){
                      // await myprojects.push(el)
                      this.projectList.push(el)
                      this.allprojs.push(el)
                      
                     }
                     
                    })
                    // await this.putDetails(myprojects)
                  });
                  
                  
                  
                 }
               }) 
  
               
               this.loadingBar.complete();
            }
          // console.log(this.projectList);
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

  public param = {
    page: 0 as number,
    assigntoid: 0 as number,
    size: 20 as number,
  };

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
        if (res.message === 'Success') {
          this.loadingBar.complete();
          this.documentList = res.data.map((item: any) => {
            const fileExt = this.getFileExt(item.docurl ? item.docurl : 'picture.png');
            const name = this.resizeName(item.docurl);
            // console.log({ ...item, fileExt });
            return { ...item, fileExt, name };
          });
          this.docList = this.documentList
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
    this.currUser = profile
    const userType = localStorage.getItem('userType')
    if (userType === 'admin') { 
      this.isAdmin = true
    }
    this.getList(this.credentials);
    this.fetchInstitutionList();
    this.getUsers(profile.id);
    // this.fetchOwntaskList(profile.id);
    this.getDocType();
    this.getProjectList();
    this.commonservice.handleBreadChrome({ parent: 'Document', child: 'Files' });
  }

  async fetchOwntaskList(id) {
    this.loadingBar.start();
    this.param.assigntoid = id;
    await this.activityservice.getAssigneeActivities(this.param)
      .subscribe(({ message, data }) => {
        if (message === 'Success') {
          this.loadingBar.complete();
          const activityList = data.map((item: any) => ({ ...item }));
          // console.log(this.activityList);
          this.taskList = activityList.filter((item: any) => item.actionflow === 'TASK');

      } 
      err => {
        console.log(err);
        // return this.activityList = [];
      };
  })
}

previewDoc(doc) {
  const dialogConfig = new MatDialogConfig();
  const document = {
    doc: doc,
    docType : this.fileExt,
    docName: this.docName
  }
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = document
  dialogConfig.width = '70%';
  dialogConfig.height = '80%';
  this.dialog.open(DocumentPreviewComponent, dialogConfig).afterClosed().subscribe(data => {
    if(data && data.action === 1) {

      
    }
  });;
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
    // this.inputFields.file = '@'+event.item(0).name+';type='+event.item(0).type;
    this.inputFields.file = event.item(0)
    // console.log(event.item(0))
    this.files.push(event.item(0));
  }

  uploadIteratedfiles(payload) {
    // console.log(payload);
    this.documentservice.uploadDocument(payload)
      .subscribe(res => {
        if (res.message === 'Success') {
          this.getList(this.credentials);
          this.files.length = 0
          return this.getSuccessNotified('New Document Added') }
        this.getErrorNotified("Something went wrong");
        this.flag =1;
      }, err => {
        console.log(err.error)
        this.flag =0;
        const error = err.error.error;
        return this.getErrorNotified(`File failed to upload ${error}`);
      });
    // console.log(this.flag);
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
    // this.inputFields.activityId = 1;
    this.inputFields.description = this.form.get('description').value;
    this.inputFields.doctypeId = this.form.get('documenttypeid').value;
    // this.inputFields.taskId = this.form.get('taskid').value;
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

  filePreview(docx){
   
    const id = docx.documentid
    this.fileExt = docx.fileExt
    this.docName = docx.name
    this.loadingBar.start();
    const profile = JSON.parse(localStorage.getItem('profile'));
    const credential ={documentId:id, userId:profile.id};
    this.documentservice.DocumentPreview(credential)
    .subscribe(res=>{
      if(res.message === 'Success') {
      this.loadingBar.complete();
        // return this.getSuccessNotified(' Document Previewed')
        return this.previewDoc(res.data)
      };

      this.getErrorNotified("Something went wrong");
      this.loadingBar.complete();
    }, error => {
      this.loadingBar.complete(); 
      console.log(error)
      const err = error.error.error;
      return this.getErrorNotified(`File failed  ${err}`);
    });
  }
   downloadURI(uri, name) 
{
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}

  fileDownload(docx){
    const id = docx.documentid
    this.loadingBar.start();
    const profile = JSON.parse(localStorage.getItem('profile'));
    const credential ={documentId:id, userId:profile.id};
    this.documentservice.DocumentPreview(credential)
    .subscribe(async res=>{
      if(res.message === 'Success') {

       await this.downloadURI(res.data, docx.name)
        return this.getSuccessNotified(' Document Downloaded')
      }
        

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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = { data: row };
    this.dialog.open(DocumentUpdateComponent, dialogConfig).afterClosed().subscribe(
      () => {
        // this.getList(this.credentials);
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

  clearSearch(){
    this.projSearchKey="";
    this.documentList = this.usrDocs
  }
  clearprjSearch(){
    this.projSearch="";
    this.projectList = this.allprojs
  }

  async applyDocFilter(){
    this.documentList = this.docList
    this.loadingBar.start();

     // console.log(this.projects.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearchKey.toLowerCase()) !== -1))
     this.documentList = this.documentList.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearchKey.toLowerCase()) !== -1)
       
   this.loadingBar.complete();
  
 }
 async applyProjFilter(){
  this.projectList = this.allprojs
  this.loadingBar.start();

   // console.log(this.projectList.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearchKey.toLowerCase()) !== -1))
   this.projectList = this.projectList.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearch.toLowerCase()) !== -1)
     
 this.loadingBar.complete();

}


}


  // console.log(temp)
    // tslint:disable-next-line: prefer-for-of
    // for (let index = 0; index < event.length; index++) {
    //   const element = event[index];
    //   console.log(element);
    //   this.files.push(element);
    // }