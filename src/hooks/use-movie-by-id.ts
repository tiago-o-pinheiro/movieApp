import {Cast, Movie, MovieDetail} from '@core/entities/movie.entity';
import {useState, useEffect} from 'react';
import * as UseCases from '@core/use-cases';
import {movieDBFetcher} from '@config/adapters/movieDB.adapter';

export const useMovieById = (movieId: number) => {
  const [movie, setMovie] = useState<MovieDetail>();
  const [cast, setCast] = useState<Cast[]>();
  const [similars, setSimilars] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const [movie, cast, similars] = await Promise.all([
          UseCases.getMovieByIdeUseCase(movieDBFetcher, movieId),
          UseCases.getCastUseCase(movieDBFetcher, movieId),
          UseCases.similarMoviesUseCase(movieDBFetcher, movieId),
        ]);

        setMovie(movie);
        setCast(cast);
        setSimilars(similars.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw new Error('Error fetching data');
      }
    };

    fetchMovie();
  }, [movieId]);

  return {movie, similars, cast, isLoading};
};
