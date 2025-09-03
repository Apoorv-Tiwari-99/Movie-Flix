interface Movie {
  imdbID: number;
  Title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  Poster: string;
  Released: string;
  video: boolean;
  imdbRating: number;
  imdbVotes: number;
}

interface TrendingMovie {
  searchTerm: string;
  movie_id: string;
  title: string;
  count: number;
  poster_url: string;
}

interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: number;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: number;
  Production: string;
  Website: string;
  Response: string; // usually "True" or "False"
}


interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}
