import { Component, OnInit } from '@angular/core';
export interface Project {
  value: string;
  viewValue: string;
}

export interface Task {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit {

  constructor() { }
  projects: Project[] = [
    {value: 'POS', viewValue: 'POS'},
    {value: 'Robot', viewValue: 'File Mechanics'},
    {value: 'Sales Manager', viewValue: 'Sales Manager'}
  ];

  tasks: Task[]=[
    {value: 'Issue', viewValue: 'Issue'},
    {value: 'Maintanance', viewValue: 'Maintanance'},
    {value: 'Assignment', viewValue: 'Assignment'}
  ]
  ngOnInit() {
  }

}
