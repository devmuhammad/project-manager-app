import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
data: any;
supervisor: any;
spvsrName: string;
groups: any;
activities: boolean;
emptyGrp: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private row: any,
    private dialogref: MatDialogRef<UserDetailsComponent>
  ) {
    this.data = row.details;
    this.activities = row.activities;
   
  }

  ngOnInit() {
  
    this.supervisor   = this.row.users.filter((user: any) => user.id === this.data.supervisor);
    console.log(this.supervisor);
    if (this.supervisor === undefined || this.supervisor.length == 0) {
      // array empty or does not exist
      this.spvsrName = 'No Supervisor';
  } else {
    this.spvsrName = this.supervisor.fullname;
  }
  // get group names
  // this.row.group.filter((grp: any) => grp.id ===this.data.group );
  // let intersection = arrA.filter(x => arrB.includes(x));
//     this.groups = [
//   {id: 1, name: 'Superadmin'},
//   {id: 2, name: 'Initiator'},
//   {id: 1, name: 'System Admin'},
// ];
    this.groups = this.row.group.filter((grp: any) => this.row.details.groups.includes(grp));

  }

  close() {
    this.dialogref.close();
  }
}
