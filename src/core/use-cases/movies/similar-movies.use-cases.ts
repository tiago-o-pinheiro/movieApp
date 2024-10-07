import {HttpAdapter} from '@config/adapters/http/http.adapter';
import {Movie} from '@core/entities/movie.entity';
import {SimilarDBResponse} from '@infrasctructure/interfaces/movie-db.responses';
import {MovieMapper} from '@infrasctructure/mapper/movie.mapper';

interface Options {
  page?: number;
  limit?: number;
}

interface Response {
  data: Movie[];
  totalPages: number;
}

export const similarMoviesUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
  options?: Options,
): Promise<Response> => {
  try {
    const similar = await fetcher.get<SimilarDBResponse>(
      `/${movieId}/similar`,
      {
        params: {
          page: options?.page || 1,
        },
      },
    );

    return {
      data: similar.results.map(MovieMapper.fromMovieDBResponseToEntity),
      totalPages: similar.total_pages,
    };
  } catch (error) {
    throw new Error('Error fetching now playing movies');
  }
};
