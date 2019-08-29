import { Component, OnInit, ViewChild } from '@angular/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { DocumentsService } from 'src/app/services/documents.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-document-container',
  templateUrl: './document-container.component.html',
  styleUrls: ['./document-container.component.css']
})


export class DocumentContainerComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;
  displayedColumns: string[] = ['#', 'url',  'doctype', 'createdat', 'reciever', 'sender', 'action'];
  constructor(private commonservice: DefaultlayoutService,
              private loadingBar: LoadingBarService,
              private snackBar: MatSnackBar,
              private btnLoader: AngularButtonLoaderService,
              private documentservice: DocumentsService) { }
  public credentials = {
    page: 0, institutionId: 1, size: 20, sFilter: '', dateto: '', datefrom: ''
  }
  getFile: any;
  files: any = [];
  documentList = [];
  dataSource: MatTableDataSource<any>;
  searchKey:'';
  resizeName = (initialName)=>{
    let length =20;
    let append = '..';
    let newName = initialName;
    if( typeof newName ==='string'){
        if(newName.length > length){  
            return newName = initialName.substring(0, length - append.length) + append;
        }else{
            return newName;
        }
  
    }else{
        if(Object.keys(newName).length > length){  
            return newName = initialName.substring(0, length - append.length) + append;
        }else{
            return newName;
        }
    }
  
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
        console.log(res)
        if (res.message === 'Success') {
          this.loadingBar.complete();
          this.documentList = res.data.map((item: any) => {
            const fileExt = this.getFileExt(item.docurl);
            const name = this.resizeName(item.docurl);
            console.log({...item, fileExt});
            return { ...item, fileExt, name };
          });
          this.dataSource = new MatTableDataSource(this.documentList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }, err => {
        this.loadingBar.complete();
        this.snackBar.open(err.message, 'Dismiss',
            {
              duration: 7000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['error']
            });
        console.log(err);
      })
  }
  ngOnInit() {
    this.getList(this.credentials);
    this.commonservice.handleBreadChrome({ parent: 'Document', child: 'Activities' })
  }

  attatchFile(event) {
    console.log(event);
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);
    }
  }

  uploadfiles() {
    console.log("we have files");
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

}
