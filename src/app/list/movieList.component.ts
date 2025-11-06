import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import NavbarComponent from '../navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import AddMovieComponent from '../addMovie/addMovie.component';
import { MovieStore } from '../store/movie.store';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  standalone: true,
  selector: 'jhi-movieList',
  templateUrl: './movieList.component.html',
  styleUrl: './movieList.component.scss',
  imports: [CommonModule, NavbarComponent, MatCardModule, MatIconModule, FormsModule, MatAutocompleteModule, MatFormFieldModule,
    MatInputModule,],
  providers: [MovieStore]
})
export default class movieListComponent implements OnInit {
  searchPopularMovie: string = '';
  searchUpcomingMovie: string = '';
  searchPlayingMovie: string = '';
  displayedNowMovies: Movie[] = [
    { title: "BHOOTNI", image: "assets/images/BhootniMovie.jpeg" },
    { title: "DAMSEL", image: "assets/images/Damsel.jpeg" },
    { title: "DUDE", image: "assets/images/dude.jpg" },
    { title: "SINGHAM AGAIN", image: "assets/images/Singham.jpg" },
    { title: "DUDE", image: "assets/images/dude.jpg" },
  ];

  displayedUpcomingMovies: Movie[] = [
    { title: "Ant-Man", image: "assets/images/Ant-Man.jpg" },
    { title: "Inception", image: "assets/images/inception.jpg" },
    { title: "Titanic", image: "assets/images/titanic.jpg" }
  ];

  displayedPopularMovies: Movie[] = [
    { title: "KALKI", image: "assets/images/Kalki.jpg" },
    { title: "VENOM", image: "assets/images/Venom.jpg" },
    { title: "DIESEL", image: "assets/images/Diesel.jpg" },
  ];

  cloneUpcommingMovies: any[] = [];
  cloneNowMovies: any[] = [];
  clonePopularMovies: any[] = [];

  showSelectedList(type: string): void {
    let elem = document.getElementById(type)
    elem?.scrollIntoView();
  }
  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.cloneUpcommingMovies = this.displayedUpcomingMovies
    this.cloneNowMovies = this.displayedNowMovies
    this.clonePopularMovies = this.displayedPopularMovies
  }
  popularMovies(): void {
    const movieList = this.displayedPopularMovies;
    if (this.searchPopularMovie) {

      if (this.searchPopularMovie !== '') {
        this.displayedPopularMovies = this.searchPopularMovie
          ? movieList.filter((movie: any) =>
            movie.title.toLowerCase().includes(this.searchPopularMovie.toLowerCase())
          )
          : movieList;
      }
    } else {
      this.displayedPopularMovies = this.clonePopularMovies
    }
  }



  upcomingMovies() {
    const movieList = this.displayedUpcomingMovies;
    if (this.searchUpcomingMovie) {

      this.displayedUpcomingMovies = this.searchUpcomingMovie
        ? movieList.filter((movie: any) =>
          movie.title.toLowerCase().includes(this.searchUpcomingMovie.toLowerCase())
        )
        : movieList;
    } else {
      this.displayedUpcomingMovies = this.cloneUpcommingMovies;
    }


  }
  nowPlayingMovies() {
    const movieList = this.displayedNowMovies;
    if (this.searchPlayingMovie) {

      this.displayedNowMovies = this.searchPlayingMovie
        ? movieList.filter((movie: any) =>
          movie.title.toLowerCase().includes(this.searchPlayingMovie.toLowerCase())
        )
        : movieList;
    } else {
      this.displayedNowMovies = this.cloneNowMovies
    }
  }
  showMovieDetails(data: any) {
    const dialogRef = this.dialog.open(AddMovieComponent, {
      width: '50%',
      height: 'auto',
      disableClose: true,
      data: {
        viewData: data,
      }

    });
  }
}