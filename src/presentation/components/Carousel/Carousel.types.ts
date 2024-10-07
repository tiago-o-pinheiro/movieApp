import {Movie} from '@core/entities/movie.entity';

export interface CarouselProps {
  movies: Movie[];
  height?: number;
  title?: string;
  size: CarouselSize;
  type?: 'flatlist' | 'scrollview';
  loadNextPage?: () => void;
}

export enum CarouselSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULL = 'full',
}
