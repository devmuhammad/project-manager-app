import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit {

  form: FormGroup;
  userLabel = ""
  userList : any []
  project: {}
  image: boolean = false
  prevImg: any = []
  
  managerList =[]
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProjectService,  
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loadingBar: LoadingBarService,
    private dialogRef: MatDialogRef<DocumentPreviewComponent>
  ) { 
   
  }

  async ngOnInit() {
    
    if (this.data.docType === ('.jpg' || '.png' || '.jpeg' || '.pdf') ){
      // this.image = true
      await this.prevImg.push(this.data.doc)
      this.image = true
      console.log(this.prevImg)

    }
    // if (this.data.docType === '.pdf'){
    //   this.convertToBase64(this.data.doc)
    //   this.image = true

    // }
  }
  
   convertToBase64(pdf) {
   
        // Select the very first file from list
        let fileToLoad = pdf;
        // FileReader function for read the file.
        let fileReader = new FileReader();
        let base64;
        // Onload of file read the file content
        // fileReader.onload = (fileLoadedEvent) => {
        //     base64 = fileLoadedEvent.target.result;
        //     // Print data in console
        //     console.log(base64);
        // };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
        this.prevImg.push(this.data.doc)
        
        console.log(this.prevImg)

    }

close() {
  this.dialogRef.close();
}




}
