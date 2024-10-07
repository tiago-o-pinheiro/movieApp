import {HttpAdapter} from '@config/adapters/http/http.adapter';
import {MovieDetail} from '@core/entities/movie.entity';
import {MovieDetailsResponse} from '@infrasctructure/interfaces/movie-db.responses';
import {MovieMapper} from '@infrasctructure/mapper/movie.mapper';

export const getMovieByIdeUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<MovieDetail> => {
  try {
    const movie = await fetcher.get<MovieDetailsResponse>(`/${movieId}`);

    const movieDetail = MovieMapper.fromMovieDBResponseToEntityDetail(movie);

    return movieDetail;
  } catch (error) {
    throw new Error('Error fetching now playing movies');
  }
};
