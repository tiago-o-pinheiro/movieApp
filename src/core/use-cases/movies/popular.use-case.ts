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

export const moviesPopularUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Response> => {
  try {
    const popular = await fetcher.get<DefaultMovieDBResponse>('/popular', {
      params: {
        page: options?.page || 1,
      },
    });

    return {
      data: popular.results.map(MovieMapper.fromMovieDBResponseToEntity),
      totalPages: popular.total_pages,
    };
  } catch (error) {
    throw new Error('Error fetching now playing movies');
  }
};
