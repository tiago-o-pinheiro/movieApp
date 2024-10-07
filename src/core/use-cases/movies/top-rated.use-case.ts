import {HttpAdapter} from '@config/adapters/http/http.adapter';
import {Movie} from '@core/entities/movie.entity';
import {DefaultMovieDBResponse} from '@infrasctructure/interfaces/movie-db.responses';
import {MovieMapper} from '@infrasctructure/mapper/movie.mapper';

interface Options {
  page?: number;
  limit?: number;
}

interface Response {
  data: Movie[];
  totalPages: number;
}

export const moviesTopRatedUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Response> => {
  try {
    const topRated = await fetcher.get<DefaultMovieDBResponse>('/top_rated', {
      params: {
        page: options?.page || 1,
      },
    });

    return {
      data: topRated.results.map(MovieMapper.fromMovieDBResponseToEntity),
      totalPages: topRated.total_pages,
    };
  } catch (error) {
    throw new Error('Error fetching now playing movies');
  }
};
