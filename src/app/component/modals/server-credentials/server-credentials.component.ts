import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-server-credentials',
  templateUrl: './server-credentials.component.html',
  styleUrls: ['./server-credentials.component.css']
})
export class ServerCredentialsComponent implements OnInit {

  projName : string
  proj: any 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ServerCredentialsComponent>

  ) { }

  ngOnInit() {

    this.projName = this.data.projectname
    this.proj = this.data
  }

  
  

  close() {
    this.dialogRef.close();
  }
}
