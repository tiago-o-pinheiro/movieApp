import {movieDBFetcher} from '@config/adapters/movieDB.adapter';
import {Movie} from '@core/entities/movie.entity';
import * as UseCases from '@core/use-cases';
import {useEffect, useState} from 'react';

export const useMovies = () => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const [nowPlaying, popular, topRated, upcoming] = await Promise.all([
      UseCases.moviesNowPlayingUseCase(movieDBFetcher),
      UseCases.moviesPopularUseCase(movieDBFetcher),
      UseCases.moviesTopRatedUseCase(movieDBFetcher),
      UseCases.moviesUpComingUseCase(movieDBFetcher),
    ]);
    setNowPlaying(nowPlaying);
    setPopular(popular);
    setTopRated(topRated);
    setUpcoming(upcoming);
    setIsLoading(false);
  };

  return {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,
  };
};
