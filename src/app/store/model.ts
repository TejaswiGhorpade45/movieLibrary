


export interface MovieData {
    id?: number;
    title?: string;
    image?: string;
    category?: string;
  }
  
  export interface MovieCategoryData {
    nowMovies: MovieData[];
    upComingMovies: MovieData[];
    popular: MovieData[];
  }