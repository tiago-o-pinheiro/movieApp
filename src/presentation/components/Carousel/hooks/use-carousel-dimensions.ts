import {Movie} from '@core/entities/movie.entity';
import {useState, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {CarouselSize} from '../Carousel.types';

const SIZES = {
  [CarouselSize.SMALL]: 0.3,
  [CarouselSize.MEDIUM]: 0.6,
  [CarouselSize.LARGE]: 0.75,
  [CarouselSize.FULL]: 0.9,
};

export const useCarouselDimensions = (size: CarouselSize) => {
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const {width, height} = useWindowDimensions();
  const sizeFactor = SIZES[size];

  useEffect(() => {
    setDimensions({
      width: width * (sizeFactor + sizeFactor * 0.15),
      height: height * sizeFactor,
    });
  }, [width, height, sizeFactor]);

  return dimensions;
};
