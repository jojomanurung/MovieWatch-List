import { Component, OnDestroy, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Movie } from '../movie-data';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogService } from '../dialog.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
    private dialogService: DialogService
  ) { this.dataSource = new MatTableDataSource<Movie>();
  }

  ngOnInit(): void {
    this.dialogService.getAll();
    this.serviceSubscribe = this.dialogService.moviesList.subscribe(res => {
      this.dataSource.data = res;
    });
  }

  openLink(url) {
    window.open(url, '_blank');
  }

  add(data: Movie) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dialogService.add(result);
      }
    });
  }

  edit(data: Movie) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dialogService.edit(result);
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogService.remove(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}
