import {Movie} from '@core/entities/movie.entity';
import {useState, useEffect} from 'react';
import * as UseCases from '@core/use-cases';
import {movieDBFetcher} from '@config/adapters/movieDB.adapter';

export const useSimilarMovies = (movieId: number) => {
  const [similars, setMovies] = useState<Movie[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const {data} = await UseCases.similarMoviesUseCase(
          movieDBFetcher,
          movieId,
        );
        setMovies(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw new Error('Error fetching similar movies');
      }
    };

    fetchMovie();
  }, [movieId]);

  return {similars, isLoading};
};
