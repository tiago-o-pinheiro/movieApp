import {HttpAdapter} from '@config/adapters/http/http.adapter';
import {Cast} from '@core/entities/movie.entity';
import {
  CastResponse,
  MovieDBCast,
} from '@infrasctructure/interfaces/movie-db.responses';
import {CastMapper} from '@infrasctructure/mapper/cast.mapper';
import {MovieMapper} from '@infrasctructure/mapper/movie.mapper';

export const getCastUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<Cast[]> => {
  try {
    const {cast} = await fetcher.get<CastResponse>(`/${movieId}/credits`);
    return cast.map(item => CastMapper.fromMovieDBCastToEntity(item));
  } catch (error) {
    throw new Error('Error fetching now playing movies');
  }
};
