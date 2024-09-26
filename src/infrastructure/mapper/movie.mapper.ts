import {Movie} from '@core/entities/movie.entity';
import type {Result} from '@infrasctructure/interfaces/movie-db.responses';

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
}
