import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie, movies } from './movie-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  moviesList: BehaviorSubject<Movie[]>;
  data: Array<Movie> = [];

  constructor() {
    this.moviesList = new BehaviorSubject([]);
    this.data = movies;
  }

  getAll() {
    this.moviesList.next(this.data);
  }

  add(moviess: Movie) {
    this.data.push(moviess);
  }

  edit(moviess: Movie) {
    let findElem = this.data.find(m => m.id == moviess.id);
    findElem.title = moviess.title;
    findElem.episodes = moviess.episodes;
    findElem.info_url = moviess.info_url;
    findElem.watch_url = moviess.watch_url;
    this.moviesList.next(this.data);
  }

  remove(id: string) {
    this.data = this.data.filter(m => {
      return m.id != id
    });

    this.moviesList.next(this.data);
  }

}
