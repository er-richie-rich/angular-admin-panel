import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-delete-popup',
  templateUrl: './confirm-delete-popup.component.html',
  styleUrls: ['./confirm-delete-popup.component.scss']
})
export class ConfirmDeletePopupComponent implements OnInit {

  constructor( public dilogRef:MatDialogRef<ConfirmDeletePopupComponent>,
      @Inject(MAT_DIALOG_DATA)public  data:any ) { }

      onNoClick(result:any):void{
    this.dilogRef.close(result)
      }
  ngOnInit(): void {
  }

}
