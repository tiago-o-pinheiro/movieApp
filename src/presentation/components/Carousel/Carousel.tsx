import {Movie} from '@core/entities/movie.entity';
import React, {useEffect, useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Poster} from './components/Poster';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '@navigation/StackNavigator';
import {gaps} from '@config/theme/gaps';
import {CarouselProps, CarouselSize} from './Carousel.types';
import {sizes} from '@config/theme/sizes';

const SIZES = {
  [CarouselSize.SMALL]: 0.3,
  [CarouselSize.MEDIUM]: 0.6,
  [CarouselSize.LARGE]: 0.75,
  [CarouselSize.FULL]: 0.9,
};

const useCarouselDimensions = (size: CarouselSize) => {
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

interface UIProps {
  data: Movie[];
  type: 'flatlist' | 'scrollview';
  width: number;
  height: number;
  loadNextPage?: () => void;
}

const UI = ({data, type, width, height, loadNextPage}: UIProps) => {
  const isLoading = useRef(false);
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const handlePress = (id: number) => {
    navigation.navigate('Details', {movieId: id});
  };

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [data]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;

    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

    const isEndedReached =
      contentOffset.x + layoutMeasurement.width >= contentSize.width;

    if (!isEndedReached) return;
    isLoading.current = true;

    loadNextPage && loadNextPage();
  };

  if (type === 'flatlist') {
    return (
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={({id}, index) => `${id}-${index}`}
        onScroll={onScroll}
        renderItem={({item}) => (
          <Poster
            src={item.poster}
            alt={item.title}
            onPress={() => handlePress(item.id)}
            {...{width, height}}
          />
        )}
      />
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data.map((item: Movie) => (
        <Poster
          key={item.id}
          src={item.poster}
          alt={item.title}
          onPress={() => handlePress(item.id)}
          {...{width, height}}
        />
      ))}
    </ScrollView>
  );
};

export const Carousel = ({
  title,
  movies,
  size = CarouselSize.LARGE,
  type = 'scrollview',
  loadNextPage,
}: CarouselProps) => {
  const {width, height} = useCarouselDimensions(size);

  return (
    <View
      style={{
        ...styles.container,
        height: height + sizes.m,
        marginBottom: gaps.xs,
      }}>
      {title && <Text style={styles.title}>{title}</Text>}
      <UI data={movies} {...{width, height, type, loadNextPage}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    marginHorizontal: gaps.xs,
    marginBottom: gaps.xxs,
  },
});
