
import { Component, inject, signal, OnInit, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import NavbarComponent from '../navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import AddMovieComponent from '../addMovie/addMovie.component';
import { MovieStore } from '../store/movie.store';
import { time } from 'console';
import { FormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  standalone: true,
  selector: 'jhi-movieList',
  templateUrl: './movieList.component.html',
  styleUrl: './movieList.component.scss',
  imports: [CommonModule,NavbarComponent,MatCardModule,MatIconModule,FormsModule,MatAutocompleteModule, MatFormFieldModule,
    MatInputModule,],
  providers:[MovieStore]
})
export default class movieListComponent implements OnInit {
  displayedMovies: Movie[] = [];
  displayedPopularMovies: Movie[] = [];
  currentIndex = 0;
  itemsPerPage = 4;
  currentMovie = 'now';
  store=inject(MovieStore)
  movieData:any
  searchPopularMovie: string = '';
  searchUpcomingMovie:string='';
  // Sample list of movies
  movies: string[] = [
    'Inception',
    'Interstellar',
    'The Dark Knight',
    'Tenet',
    'Dunkirk',
    'Memento',
    'The Prestige'
  ];
  constructor(public dialog: MatDialog,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // used store for storing local data 
    this.store.addMovieList();
    this.getCurrentMovieList()
    this.updateVisibleMovies();

    this.popularMovies()
  }

  getCurrentMovieList() {
    // I acessed Local stored data 
    const movieDetails = this.store.movieDetails();
    switch (this.currentMovie) {
      case 'upcoming':
        return movieDetails.upComingMovies;
      case 'popular':
        return movieDetails.popular;
      default:
        return movieDetails.nowMovies;
    }
  }

  updateVisibleMovies(): void {
    const movieList = this.getCurrentMovieList();
    this.displayedMovies  = this.searchUpcomingMovie
      ? movieList.filter((movie: any) =>
          movie.title.toLowerCase().includes(this.searchUpcomingMovie.toLowerCase())
        )
      : movieList;   
  }

  popularMovies(): void {
    const movieList = this.getCurrentMovieList();

    this.displayedPopularMovies  = this.searchPopularMovie
      ? movieList.filter((movie: any) =>
          movie.title.toLowerCase().includes(this.searchPopularMovie.toLowerCase())
        )
      : movieList;
  }

  
  // next(): void {
  //  const movieList = this.getCurrentMovieList();
  //   if (this.currentIndex + this.itemsPerPage < movieList.length) {
  //     this.currentIndex++;
  //     this.updateVisibleMovies();
  //   }
  // }
  onSearchChange(): void {
    this.currentIndex = 0;
    this.updateVisibleMovies();
  }
  // prev(): void {
  //   if (this.currentIndex > 0) {
  //     this.currentIndex--;
  //     this.updateVisibleMovies();
  //   }
  // }

  showSelectedList(type: string): void {
    let elem = document.getElementById(type)
    elem?.scrollIntoView();
    this.currentMovie = type;
    this.currentIndex = 0;
    this.updateVisibleMovies();
  }

  addMovie(): void {
    //here open dialog for adding movie 
    const dialogRef = this.dialog.open(AddMovieComponent, {
      width: '50%',
      height:'auto',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: Movie) => {
      if (result) {
        this.store.addMovieToCategory(result);
        this.updateVisibleMovies();
        this.cdr.detectChanges();
      }
    });
  }

  showMovieDetails(data:any){
    const dialogRef = this.dialog.open(AddMovieComponent, {
      width: '50%',
      height:'auto',
      disableClose: true,
      data:{
        viewData:data,
      }
      
    });
  }
}