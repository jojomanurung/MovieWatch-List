import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie, movies } from '../movie-data';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  formInstance: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dat: Movie
  ) { this.formInstance = new FormGroup({
    "id": new FormControl('',),
    "title": new FormControl('', Validators.required),
    "episodes": new FormControl(''),
    "info_url": new FormControl(''),
    "watch_url": new FormControl('')
  });
  this.formInstance.setValue(dat);
  }


  ngOnInit(): void {

  }

  save(): void {
    this.dialogRef.close(Object.assign(new Movie(), this.formInstance.value));
  }

  close() {
    this.dialogRef.close();
  }
}
