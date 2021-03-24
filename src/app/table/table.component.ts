import { Component, OnInit, } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Movie, movies } from '../movie-data';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [ 'title', 'episodes', 'info_url', 'watch_url', 'action'];
  data: Movie[] = movies;
  selectedMovie?: Movie;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openLink(url) {
    window.open(url, '_blank');
  }

  addMovie() {
    console.log("Add Movie");
  }

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
    console.log("selected movie :", this.selectedMovie);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
    });

    console.log("Success");
  }
}
