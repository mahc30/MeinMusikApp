import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-track-dialog',
  templateUrl: './delete-track-dialog.component.html',
  styleUrls: ['./delete-track-dialog.component.css']
})
export class DeleteTrackDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteTrackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    setTimeout(()=> this.dialogRef.close() , 2500);
  }

  onCancel(): void{
    this.dialogRef.close();
  }}
