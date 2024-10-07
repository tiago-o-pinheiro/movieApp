import {Cast} from '@core/entities/movie.entity';
import {useState, useEffect} from 'react';
import * as UseCases from '@core/use-cases';
import {movieDBFetcher} from '@config/adapters/movieDB.adapter';

const filterUniqueCast = (cast: Cast[]) => {
  return cast.filter(
    (movie, index, self) => index === self.findIndex(t => t.id === movie.id),
  );
};

export const useCast = (movieId: number) => {
  const [cast, setCast] = useState<Cast[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const cast = await UseCases.getCastUseCase(movieDBFetcher, movieId);

      setCast(cast);
      setIsLoading(false);
    };

    fetchMovie();
  }, [movieId]);

  return {cast: filterUniqueCast(cast || []), isLoading};
};
