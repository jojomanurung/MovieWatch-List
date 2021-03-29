import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { Movie } from '../movie-data';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  dialogTitle: string = "";

  movieForm = this.fb.group({
    id: new FormControl (''),
    title: new FormControl ('', Validators.required),
    episodes: new FormControl (''),
    watch_url: new FormControl (''),
    info_url: new FormControl ('')
  });

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Movie
  ) { this.movieForm.patchValue(this.data); }


  ngOnInit(): void {
  }

  onSubmit() {
    this.dialogRef.close(Object.assign(new Movie(), this.movieForm.value));
  }

}
