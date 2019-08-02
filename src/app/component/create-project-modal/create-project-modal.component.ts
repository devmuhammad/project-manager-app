import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { getLocaleDateFormat } from '@angular/common';
import { ClientsService } from 'src/app/services/clients.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';



@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.css']
})

export class CreateProjectModalComponent implements OnInit {
  form: FormGroup;
  detail_desc: string;
  defaultdate: Date;
  currentDate = ''
  format = 'dd/MM/yyyy';
  typeLabel: string;
  clientsList = [];

  types = [
    { projecttypeId: 1, description: 'Software project' },
    { projecttypeId: 2, description: 'Training' },
    { projecttypeId: 3, description: 'Journal' },
    { projecttypeId: 4, description: 'Contract' }
  ];

  status = [
    { projecttypeId: 1, description: 'Todo' },
    { projecttypeId: 2, description: 'In progress' },
    { projecttypeId: 3, description: 'Completed' },
    { projecttypeId: 4, description: 'Suspended' }
  ];

  public inputFields = {
    projectname: '',
    projecttypeId: '',
    startdate: new Date(),
    enddate: new Date(),
    projectstatus: 'New',
    description: '',
    code: '',
    projectId: 6 as number,
    clientid: 0 as number,
    datecreated:'',
    lastmodified: '',
  }

  constructor(
    private fb: FormBuilder,
    private service: ProjectService,
    private loadingBar: LoadingBarService,
    private btnLoader: AngularButtonLoaderService,
    private snackbar: MatSnackBar,
    private clientservice: ClientsService,
    private dialogRef: MatDialogRef<CreateProjectModalComponent>) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      // stagingSeverUrl: new FormControl(''),
      // productionServerUrl: new FormControl(''),
      // repository: new FormControl('', Validators.required),
      startdate: [this.currentDate, Validators.required],
      enddate: ['', Validators.required],
      code: ['', Validators.required],
      client: ['', Validators.required],
      projectmanager: [''],
    });
  }
  getClients() {
    this.clientservice.gettableData()
      .subscribe((clnt) => {
        this.clientsList = clnt.map(item => {
          return { id: item.id, name: item.name };
        });
      });
  }

  getProjectTypes() {
    this.typeLabel = "Fetching Project Types..."
    this.service.getProjectType()
      .subscribe(({ meta, data, message }) => {
        if (message === "Success") {
          console.log(data);
          this.types = data.map(item => {
            return { ...item };
          });
          this.typeLabel = "Types"
        }
      }, err => this.typeLabel = 'Could\'nt fetch projects');
  }
  getCurrentDate() {
    var today = new Date();
    this.currentDate = today.toISOString();
    console.log(this.currentDate);
    return this.currentDate;
  }
  ngOnInit() {
    this.getCurrentDate();
    this.getClients();
    this.getProjectTypes();
  }

  save() {
    this.loadingBar.start();
    this.btnLoader.displayLoader();
    this.inputFields.projectname = this.form.get('name').value;
    this.inputFields.code = this.form.get('code').value;
    this.inputFields.projecttypeId = this.form.get('type').value;
    // this.inputFields.username = this.form.get('username').value;
    // this.inputFields.institutionid = 0
    // this.inputFields.designationid = 1
    this.inputFields.clientid = this.form.get('client').value;
    this.inputFields.startdate = this.form.get('startdate').value.toISOString();
    this.inputFields.enddate = this.form.get('enddate').value.toISOString();
    this.inputFields.description = this.form.get('description').value;
    this.inputFields.datecreated = this.currentDate;
    this.inputFields.lastmodified = this.currentDate;
    console.log(this.inputFields);
    return this.service.addnewProject(this.inputFields)
      .subscribe(({ meta, message, data }) => {
        console.log(message);
        console.log(data);
        if (message === 'Failed') {
          this.loadingBar.complete();
          this.btnLoader.hideLoader();
          return this.snackbar.open(`${message} ${data}`, 'Dismiss', {
            panelClass: ['error'],
            duration: 7000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
        if (message === 'Success' || 'Operation Successful') {
          console.log(data);
          this.loadingBar.complete();
          this.btnLoader.hideLoader();
          this.snackbar.open('New Project Created Successful', 'Dismiss', {
            panelClass: ['success'],
            duration: 7000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          return this.dialogRef.close();
        } else {
          this.loadingBar.complete();
          this.btnLoader.hideLoader();
          return this.snackbar.open('Failed to create new New Project', 'Dismiss', {
            panelClass: ['error'],
            duration: 7000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      }, err => {
        this.loadingBar.complete();
        this.btnLoader.hideLoader();
        return this.snackbar.open(' Failed to create a new Project please check input and try again', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      });
  }

  close() {
    this.dialogRef.close();
  }
}
