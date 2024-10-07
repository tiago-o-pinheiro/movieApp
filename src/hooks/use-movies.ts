import {movieDBFetcher} from '@config/adapters/movieDB.adapter';
import {Movie} from '@core/entities/movie.entity';
import * as UseCases from '@core/use-cases';
import {useEffect, useRef, useState} from 'react';

interface Response {
  data: Movie[];
  totalPages: number;
}

interface OPTIONS {
  [x: string]: {
    page: number;
    totalPages: number;
    fetcher: keyof typeof UseCases;
  };
}

let MOVIE_OPTIONS: OPTIONS = {
  popular: {
    page: 1,
    totalPages: 0,
    fetcher: 'moviesPopularUseCase',
  },
  topRated: {
    page: 1,
    totalPages: 0,
    fetcher: 'moviesTopRatedUseCase',
  },
  upcoming: {
    page: 1,
    totalPages: 0,
    fetcher: 'moviesUpComingUseCase',
  },
};

interface MOVIE_PROPS {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

const filterUniqueMovies = (movies: Movie[]) => {
  return movies.filter(
    (movie, index, self) => index === self.findIndex(t => t.id === movie.id),
  );
};

export const useMovies = () => {
  const [movies, setMovies] = useState<MOVIE_PROPS>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const options = useRef<OPTIONS>(MOVIE_OPTIONS);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    try {
      const [nowPlaying, popular, topRated, upcoming] = await Promise.all([
        UseCases.moviesNowPlayingUseCase(movieDBFetcher),
        UseCases.moviesPopularUseCase(movieDBFetcher),
        UseCases.moviesTopRatedUseCase(movieDBFetcher),
        UseCases.moviesUpComingUseCase(movieDBFetcher),
      ]);

      setMovies({
        nowPlaying: nowPlaying,
        popular: popular.data,
        topRated: topRated.data,
        upcoming: upcoming.data,
      });
      options.current.popular.totalPages = popular.totalPages;
      options.current.topRated.totalPages = topRated.totalPages;
      options.current.upcoming.totalPages = upcoming.totalPages;

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error('Error fetching movies');
    }
  };

  const fetchNextPage = async (type: 'popular' | 'topRated' | 'upcoming') => {
    const response = (await UseCases[options.current[type].fetcher](
      movieDBFetcher,
      options.current[type].page,
    )) as Response;

    setMovies(prev => ({
      ...prev,
      [type]: [...prev[type], ...response.data],
    }));

    if (options.current[type].totalPages >= options.current[type].page) {
      options.current[type].page = options.current[type].page + 1;
    }
  };

  return {
    isLoading,
    nowPlaying: filterUniqueMovies(movies.nowPlaying),
    popular: filterUniqueMovies(movies.popular),
    topRated: filterUniqueMovies(movies.topRated),
    upcoming: filterUniqueMovies(movies.upcoming),
    fetchNextPage,
  };
};
