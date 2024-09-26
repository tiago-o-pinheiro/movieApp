import {HttpAdapter} from '@config/adapters/http/http.adapter';
import {Movie} from '@core/entities/movie.entity';
import {DefaultMovieDBResponse} from '@infrasctructure/interfaces/movie-db.responses';
import {MovieMapper} from '@infrasctructure/mapper/movie.mapper';

export const moviesPopularUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const popular = await fetcher.get<DefaultMovieDBResponse>('/popular');

    return popular.results.map(MovieMapper.fromMovieDBResponseToEntity);
  } catch (error) {
    throw new Error('Error fetching now playing movies');
  }
};
