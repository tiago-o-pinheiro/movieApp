import {Cast, Movie, MovieDetail} from '@core/entities/movie.entity';
import type {
  CastResponse,
  MovieDetailsResponse,
  Result,
} from '@infrasctructure/interfaces/movie-db.responses';

export class MovieMapper {
  static fromMovieDBResponseToEntity(result: Result): Movie {
    return {
      id: result.id,
      title: result.title,
      description: result.overview,
      releaseDate: new Date(result.release_date),
      rating: result.vote_average,
      poster: result.poster_path
        ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
        : '',
      backdrop: result.backdrop_path
        ? `https://image.tmdb.org/t/p/w500${result.backdrop_path}`
        : '',
    };
  }

  static fromMovieDBResponseToEntityDetail(
    movie: MovieDetailsResponse,
  ): MovieDetail {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: new Date(movie.release_date),
      rating: movie.vote_average,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '',
      backdrop: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
        : '',
      genres: movie.genres,
      duration: movie.runtime,
      trailer: '',
      budget: movie.budget,
      originalTitle: movie.original_title,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
    };
  }
}
