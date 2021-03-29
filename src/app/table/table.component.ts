import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { DialogComponent } from '../dialog/dialog.component';
import { DialogService } from '../dialog.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Movie } from '../movie-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = [ 'title', 'episodes', 'info_url', 'watch_url', 'action'];
  public dataSource: MatTableDataSource<Movie>;
  private serviceSubscribe: Subscription;

  constructor(
    public dialog: MatDialog,
    private dialogService: DialogService,
  ) {
    this.dataSource = new MatTableDataSource<Movie>();
  }

  ngOnInit(): void {
    this.dialogService.getAll();
    this.serviceSubscribe = this.dialogService._data.subscribe(res => {
      this.dataSource.data = res;
    })
  }


  openLink(url) {
    window.open(url, '_blank');
  }

  addMovie() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(add => {
      if(add) {
        this.dialogService.addMovie(add);
      }
    });
  }

  editMovie(data: Movie) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(editData => {
      if(editData) {
        this.dialogService.editMovie(editData);
      }
    });
  }

  deleteMovie() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});

    dialogRef.afterClosed().subscribe(deleteData => {
      if(deleteData) {
        this.dialogService.removeMovie(deleteData);
      }
    });
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}
