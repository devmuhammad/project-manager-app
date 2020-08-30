import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ProjectService } from '../../../services/project.service';
import { ActivityService } from 'src/app/services/activity.service';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-project-timeline',
  templateUrl: './project-timeline.component.html',
  styleUrls: ['./project-timelime.component.css']
})
export class ProjectTimelineComponent implements OnInit {
  
  form: FormGroup;

  activityList = []
  currUser : any
  isAdmin : boolean = false
  loading = false
  proj : string
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProjectService,  
    private activityServices: ActivityService,
    private loadingBar: LoadingBarService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProjectTimelineComponent>) 
    {
      this.form = this.fb.group({ })
    }

 async ngOnInit() {
   
      const profile = JSON.parse(localStorage.getItem('profile'))
      this.currUser = profile
      
      const userType = localStorage.getItem('userType')
      
      if (userType === 'admin') { 
        this.isAdmin = true
        
  }
  this.proj = this.data.projectname
  this.getActivities()

}

getDate(dt){
  return new Date(dt).toDateString()
}

print(){
  let printElement = document.getElementById("printElem");
  let printWindow = window.open();
  printWindow.document.write(document.documentElement.innerHTML);
  let docTitle = document.getElementById("title")
  // setTimeout(() => { // Needed for large documents
    printWindow.document.body.style.margin = '0 0';
    printWindow.document.body.innerHTML =  "<html><body>" + 
          docTitle.innerHTML + "<br/> "+ printElement.innerHTML +"</body>"
    // printWindow.document.close(); // necessary for IE >= 10
    // printWindow.focus(); // necessary for IE >= 10*/
    printWindow.print();
    setTimeout(() => { // Needed for large documents
      printWindow.close();
    }, 100)
}

async getActivities  () {
  this.loadingBar.start()
  const param ={
    page: 0,
    size:20,
    projectid: this.data.projectId
  }

  this.activityServices.getActivitiesList()
   .subscribe(res => {

     if (res.message === "true") {
       
       let List = res.data.map((item: any) => ({...item}));

       List = List.sort((a,b) => b.datecreated - a.datecreated)
       
          List.forEach(el => {
            if(el.projectid == this.data.projectId){

              this.activityList.push(el)
              this.loadingBar.complete()

            }
          })
  // console.log(this.activityList)
        
     }
   }, err => {
     console.log(err)
     this.activityList = [];
    this.loadingBar.complete()

     this.snackBar.open('Network Failed', 'Dismiss', {
       panelClass: ['error'],
       duration: 7000,
       verticalPosition: 'bottom',
       horizontalPosition: 'right'
     });
   });

  
 }
  getFileName = () => {

  let timeSpan = new Date().toISOString();
  let sheetName = this.proj || "ExportResult";
  let fileName = `${sheetName}-${timeSpan}`;
  return {
    sheetName,
    fileName
  };
};
 
 exportXL(){
   const xlCol = this.activityList.map((x) => { 
     return {user: x.username, activity:x.activitystatus,
              comment:x.usercomment,
              date: new Date(x.datecreated).toDateString()  
              }})

    let { sheetName, fileName } = this.getFileName();

    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(xlCol);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
 }
  


close() {
  this.dialogRef.close();
}
}
