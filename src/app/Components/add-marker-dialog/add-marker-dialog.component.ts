import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup,  } from '@angular/forms';
@Component({
  selector: 'app-add-marker-dialog',
  templateUrl: './add-marker-dialog.component.html',
  styleUrls: ['./add-marker-dialog.component.css']
})
export class AddMarkerDialogComponent implements OnInit {
  MapForm!: FormGroup;
  
  constructor(public fb:FormBuilder,public dialogRef: MatDialogRef<AddMarkerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public PopupData: any
    //PopupData - get data from dialog using component
    ) { }

  ngOnInit(): void {
    this.MapForm = this.fb.group({
      Name: [''],
      Description: [''],
    });
  }


  Save(){
   this.dialogRef.close(this.MapForm.value)
   //sending data to dialog opened component
  }
}
