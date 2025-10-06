import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { MovieCategoryData } from './model';


export interface MovieState {
  movieDetails: MovieCategoryData;
}

const initialState: MovieState = {
  movieDetails: {} as MovieCategoryData,
};

export const MovieStore = signalStore(
  { providedIn: `root` },
  withDevtools('MovieStore'),
  withState(initialState),
  
  withMethods((store, httpClient = inject(HttpClient)) => ({
    reset() {
      patchState(store, initialState);
    },

    addMovieList(){
      const movies: Movie[] = [
        { title: "BHOOTNI", image: "assets/images/BhootniMovie.jpeg" },
        { title: "DAMSEL", image: "assets/images/Damsel.jpeg" },
        { title: "DUDE", image: "assets/images/dude.jpg" },
        { title: "SINGHAM AGAIN", image: "assets/images/Singham.jpg" },
        { title: "DUDE", image: "assets/images/dude.jpg" },
        { title: "SINGHAM AGAIN", image: "assets/images/Singham.jpg" }
      ];
    
      const upComingMovies: Movie[] = [
        { title: "Ant-Man", image: "assets/images/Ant-Man.jpg" },
        { title: "Inception", image: "assets/images/inception.jpg" },
        { title: "Titanic", image: "assets/images/titanic.jpg" }
      ];
    
     const popular: Movie[] = [
        { title: "KALKI", image: "assets/images/Kalki.jpg" },
        { title: "VENOM", image: "assets/images/Venom.jpg" },
        { title: "DIESEL", image: "assets/images/Diesel.jpg" },
      ];

      const allMovies:MovieCategoryData = {
        nowMovies: movies,
        upComingMovies: upComingMovies,
        popular: popular,
      };
      patchState(store, { movieDetails: allMovies });
    },

    addMovieToCategory(movie: any) {
      const current = store.movieDetails();
    
      if (!movie.category) return;
    
      let updatedMovies;
      switch (movie.category) {
        case 'now':
          updatedMovies = {
            ...current,
            nowMovies: [...current.nowMovies, movie]
          };
          break;
        case 'upcoming':
          updatedMovies = {
            ...current,
            upComingMovies: [...current.upComingMovies, movie]
          };
          break;
        case 'popular':
          updatedMovies = {
            ...current,
            popular: [...current.popular, movie]
          };
          break;
        default:
          return;
      }
    
      patchState(store, { movieDetails: updatedMovies });
    }

})))




