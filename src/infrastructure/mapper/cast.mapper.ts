import {Cast} from '@core/entities/movie.entity';
import type {
  CastResponse,
  MovieDBCast,
} from '@infrasctructure/interfaces/movie-db.responses';

export class CastMapper {
  static fromMovieDBCastToEntity(cast: MovieDBCast): Cast {
    return {
      adult: cast.adult,
      gender: cast.gender,
      id: cast.id,
      name: cast.name,
      popularity: cast.popularity,
      avatar: cast.profile_path
        ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
        : 'https://i.stack.imgur.com/l60Hf.png',
      character: cast.character,
    };
  }
}
