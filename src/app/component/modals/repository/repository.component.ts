import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ProjectService } from '../../../services/project.service';
import axios from 'axios'

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  
  form: FormGroup;

  currUser : any
  isAdmin = false
  canEdit = true
  reponame = ''
  userbranch = ''
  allrepo : any[]
  invalidUrl = false
  invalidMsg = ''
  repoObj : any
  repoType =[
    {name: "Bitbucket", value:"Bitbucket"},
    {name: "Github", value:"Github"},
  ]
  verified: boolean = false

  public inputFields = {
    url: '',
    description: '',
    projectid: 0,
    users: 0,
    repoid:0,
    comments:"",
    username: '',
    password: '',
    repotype: ''
  }
  branchid = 0

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProjectService,
    private loadingBar: LoadingBarService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RepositoryComponent>) 
    {
      this.form = this.fb.group({ 
        repo : {value: "", disabled: this.isAdmin}, 
        branch: [""],
        username:[''],
        repotype: [''],
        password: ['']})
    }

 async ngOnInit() {
   
      const profile = JSON.parse(localStorage.getItem('profile'))
      this.currUser = profile
      
      const userType = localStorage.getItem('userType')
      
      if (userType === 'admin') { 
        this.isAdmin = true
        this.canEdit = false
        
  }
  await this.getProjectRepo()
  await this.getRepoBranches()
  
}

  getErrorMessage() {
    const urlRegex =  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/
    if ( urlRegex.test(this.form.get('repo').value)
    // (/^((http(s?)?):\/\/)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g)
    ){
        
      return true;
    }else  {
      
      this.invalidUrl = true
      
      return false
    }
  }
  verifyRepo(repo){
    if (repo.repotype === 'Bitbucket'){

    }

  }

  async updtRepo(){
    const repp ={
      comments: this.inputFields.comments,
      id: this.inputFields.repoid,
      projectid: this.inputFields.projectid,
      url: this.inputFields.url,
      user: this.inputFields.users,
      username: this.inputFields.username,
      password: this.inputFields.password,
      repotype: this.inputFields.repotype
    }
    // this.verifyRepo(repp)
    await this.service.updateRepo(repp)
        .subscribe(async response => {
        if (response.message === 'Success') {

          this.loadingBar.complete();
          this.snackBar.open('Success ! Repo Updated', 'Dismiss', {
            panelClass: ['success'],
            duration: 7000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        }else {
          this.loadingBar.complete();
          this.showFailed()
        }
        },err =>  {
          console.log(err) 
          this.loadingBar.complete();
        })
  }

  async addRepo(){
    const repp ={
      comments: this.inputFields.comments,
      projectid: this.inputFields.projectid,
      url: this.inputFields.url,
      user: this.inputFields.users,
      username: this.inputFields.username,
      password: this.inputFields.password,
      repotype: this.inputFields.repotype
    }
    // this.verifyRepo(repp)
    await this.service.addRepo(repp)
      .subscribe(async response => {
      if (response.message === 'Success') {

        this.loadingBar.complete();
        this.snackBar.open('Success ! Repo Added', 'Dismiss', {
          panelClass: ['success'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }else {
        this.loadingBar.complete();
        this.showFailed()
      }
      },err =>  {
        console.log(err) 
        this.loadingBar.complete();
      })
  }

  async updtRepoBranch(){
    const brnch ={
      description: this.inputFields.description,
      repoid: this.inputFields.repoid,
      projectid: this.inputFields.projectid,
      users: this.inputFields.users,
      id: this.branchid
    }
    await this.service.updateRepoBranches(brnch)
    .subscribe(async response => {
    if (response.message === 'Success') {

      this.loadingBar.complete();
      this.snackBar.open('Success ! Branch Updated', 'Dismiss', {
        panelClass: ['success'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    }else {
      this.loadingBar.complete();
      this.showFailed()
    }
    },err =>  {
      console.log(err) 
      this.loadingBar.complete();
    })
  }

  async addRepoBranch(){
    const branch  ={
      description: this.inputFields.description,
      repoid : this.inputFields.repoid,
      projectid: this.inputFields.projectid,
      users:this.inputFields.users
    }
    await this.service.addRepoBranch(branch)
    .subscribe(async response => {
    if (response.message === 'Success') {

      this.loadingBar.complete();
      this.snackBar.open('Success ! Branch Added', 'Dismiss', {
        panelClass: ['success'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    }else {
      this.loadingBar.complete();
      this.showFailed()
    }
    },err =>  {
      console.log(err) 
      this.loadingBar.complete();
    })
  }

  showFailed(){
    this.snackBar.open('Error ! Could not complete', 'Dismiss', {
      panelClass: ['failed'],
      duration: 7000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }
   

async save(){
  this.invalidUrl = false
  this.loadingBar.start();
  this.inputFields.url = this.form.get('repo').value;
  this.inputFields.description = this.form.get('branch').value;
  this.inputFields.projectid = this.data.projectId
  this.inputFields.users = this.currUser.id
  this.inputFields.username = this.form.get('username').value
  this.inputFields.password = this.form.get('password').value
  this.inputFields.repotype = this.form.get('repotype').value

  if(this.isAdmin){
    if(!this.getErrorMessage()){
      this.loadingBar.complete();
      
      return;
    }
   
    if (this.reponame !== "" ){
        // update
          this.updtRepo()
          
    }else {
      // create
        this.addRepo()
    } 
        if(this.userbranch !== ""){
          this.updtRepoBranch()
        }else if (this.inputFields.description !== "")
        {this.addRepoBranch()}

  }else {
    if(this.userbranch !== ""){

      // Update
      this.updtRepoBranch
    }else {

      // create new
      this.addRepoBranch()
    }
  }
  

}

async getRepoBranches(){
  await this.service.getRepoBranches()
  .subscribe(async({ message, data }) => {
    if (message === "Success") {
      const repo = data.find((item: any) => {return item.users == this.currUser.id && item.projectid == this.data.projectId  });

      if (repo){
        this.userbranch = repo.description
        this.form.get('branch').setValue(repo.description);
        this.branchid = repo.id
      }
    }
  })
}

async getProjectRepo(){
  await this.service.getRepoList()
  .subscribe(async({ message, data }) => {
    
    if (message === "Success") {
      const repo = data.find((item: any) => { return item.projectid == this.data.projectId });
      
      if (repo){
        this.reponame = repo.url
        this.form.get('repo').setValue(repo.url)
        this.inputFields.repoid = repo.id
        this.form.get('repotype').setValue(repo.repotype)
        this.form.get('username').setValue(repo.username)
        this.form.get('password').setValue(repo.password)
        this.repoObj = repo
      }
    }
  })
}


close() {
  this.dialogRef.close();
}
}
