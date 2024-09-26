import {HttpAdapter} from '@config/adapters/http/http.adapter';
import {Movie} from '@core/entities/movie.entity';
import {DefaultMovieDBResponse} from '@infrasctructure/interfaces/movie-db.responses';
import {MovieMapper} from '@infrasctructure/mapper/movie.mapper';

export const moviesTopRatedUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const topRated = await fetcher.get<DefaultMovieDBResponse>('/top_rated');

    return topRated.results.map(MovieMapper.fromMovieDBResponseToEntity);
  } catch (error) {
    throw new Error('Error fetching now playing movies');
  }
};
