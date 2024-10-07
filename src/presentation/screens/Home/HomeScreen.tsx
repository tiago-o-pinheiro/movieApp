import {CarouselSize} from '@components/Carousel';
import {Carousel} from '@components/Carousel/Carousel';
import {Loader} from '@components/Loader/Loader';
import {gaps} from '@config/theme/gaps';
import {useMovies} from '@hooks/use-movies';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading, fetchNextPage} =
    useMovies();
  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return <Loader size="large" />;
  }

  return (
    <ScrollView>
      <View
        style={{
          ...styles.container,
          marginTop: gaps.xs + top,
          paddingBottom: gaps.xs,
        }}>
        <Carousel movies={nowPlaying} size={CarouselSize.MEDIUM} />
        <Carousel
          movies={popular}
          title="Popular"
          size={CarouselSize.SMALL}
          type="flatlist"
          loadNextPage={() => fetchNextPage('popular')}
        />
        <Carousel
          movies={topRated}
          title="Top Rated"
          size={CarouselSize.SMALL}
          type="flatlist"
          loadNextPage={() => fetchNextPage('topRated')}
        />
        <Carousel
          movies={upcoming}
          title="Upcoming"
          size={CarouselSize.SMALL}
          type="flatlist"
          loadNextPage={() => fetchNextPage('upcoming')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});
