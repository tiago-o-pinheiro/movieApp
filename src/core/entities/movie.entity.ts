export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  rating: number;
  poster: string;
  backdrop: string;
}

type Genres = {
  id: number;
  name: string;
};

export interface MovieDetail extends Movie {
  genres: Genres[];
  duration: number;
  trailer: string;
  budget: number;
  originalTitle: string;
  voteAverage: number;
  voteCount: number;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  popularity: number;
  avatar: string;
  character?: string;
}
