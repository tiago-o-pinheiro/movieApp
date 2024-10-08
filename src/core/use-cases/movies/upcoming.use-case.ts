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

export const moviesUpComingUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Response> => {
  try {
    const upComing = await fetcher.get<DefaultMovieDBResponse>('/upcoming', {
      params: {
        page: options?.page || 1,
      },
    });

    return {
      data: upComing.results.map(MovieMapper.fromMovieDBResponseToEntity),
      totalPages: upComing.total_pages,
    };
  } catch (error) {
    throw new Error('Error fetching now playing movies');
  }
};
