import { Component, OnInit,ViewChild, Input } from '@angular/core';
import {MatTableDataSource, MatSort,MatPaginator, MatDialogConfig, MatDialog} from '@angular/material'
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { ServerService } from 'src/app/services/server.service';
import { AddServerToolComponent } from '../../modals/add-server-tools/add-server-tool.component'

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  
  displayedToolsColumns: string[] = ['#',  'Database', 'applicationserver','status','actions'];
  @Input() project: any 
  projId: any;
  constructor(private service: ServerService, 
              private commonservice: DefaultlayoutService,
              private dialog: MatDialog ) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;

  searchKey: '';
  tools: any 
  toolsdataSource: MatTableDataSource<any>

  ngOnInit() {
    this.commonservice.handleBreadChrome({parent: 'Settings', child: 'Server'});
    /* account data table*/
     /* tools data table*/
     this.projId = this.project.projectId
    this.getTools()
    /* credentials data table*/
    
  }

  deleteServer(id){
    this.service.deleteServerTool(id)
    .subscribe((res)=>{
        if (res.message === "Success"){
          this.getTools()
        }
    })
 }

  getTools(){
    this.service.getServerToolsProject(this.projId)
    .subscribe((tools)=>{
      let dataArray = tools.data
      this.tools = tools.data
      // .map((item)=>{
      //   return {...item}
      // });
      this.toolsdataSource = new MatTableDataSource(dataArray);
    })
    this.toolsdataSource.sort =this.sort;
    this.toolsdataSource.paginator = this.paginator;
  }

   openNew(el){
    if(el){
      this.project = {...this.project, ...el};
    }else {
      const projId = this.project.projectId
      const projname = this.project.projectname
      this.project = {}
      this.project.projectid = projId
      this.project.projectname = projname
    }
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = this.project
  dialogConfig.width = '30%';
  this.dialog.open(AddServerToolComponent, dialogConfig).afterClosed().subscribe(() => {
    // this.updateRecord();
    this.getTools()
  }
  );
}

/*account table methods*/

  /* tools table methods */
  toolsearchKey=""
  onToolSearchClear(){
    this.toolsearchKey="";
    this.applyToolFilter();
  }
  applyToolFilter(){
    this.toolsdataSource.filter = this.toolsearchKey.trim().toLocaleLowerCase();
  }
  
    /* Applications table methods */
    // appSearchKey=""
    // onAppSearchClear(){
    //   this.appSearchKey="";
    //   this.applyAppFilter();
    // }
    // applyAppFilter(){
    //   this.applicationdataSource.filter = this.appSearchKey.trim().toLocaleLowerCase();
    // }
}
