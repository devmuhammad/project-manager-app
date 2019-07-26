import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { LoadingBarComponent, LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  form: FormGroup;
  public clientsInputs = {
    name: '',
    contactphone: '',
    contactemail: '',
    contactperson: '',
    weburl: '',
  };
  view: boolean;
  inputType: string;
  vpasswordType: string;
  show: boolean;
   groups: string;
  constructor(
    private dialogRef: MatDialogRef<CreateClientComponent>,
    private fb: FormBuilder,
    private btnLoader: AngularButtonLoaderService,
    private loadingBar: LoadingBarService,
    ) {
      this.form = this.fb.group({
        name: [this.clientsInputs.name, Validators.required],
        contactemail: ['', [Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')]],
        contactperson: ['', Validators.required],
        contactphone: ['', Validators.required, Validators.minLength(8)],
        weburl: ['', Validators.required],

      });
     }

  ngOnInit() {
    
  }

  save() {
   
  }
  close() {
    this.dialogRef.close();
  }
}
