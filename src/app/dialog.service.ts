import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie, movies } from './movie-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  _data: BehaviorSubject<Movie[]>;
  data: Movie[] = [];

  constructor(
  ) {
    this._data = new BehaviorSubject([]);
    this.data = movies;
  }


  getAll() {
    this._data.next(this.data);
  }

  addMovie(add: Movie) {
    this.data.push(add);
    console.log("add data success", this.data);
    this._data.next(this.data);
  }

  editMovie(editData: Movie) {
    const findElem = this.data.findIndex(m => m.id == editData.id);
    this.data[findElem] = editData;
    console.log("this data edited", this.data);
    this._data.next(this.data);
  }

  removeMovie(removeData: Movie) {
    const findElem = this.data.findIndex(m => m.id == removeData.id);
    this.data.splice(findElem, 1);
    console.log("movie removed", this.data);
    this._data.next(this.data);
  }

}
