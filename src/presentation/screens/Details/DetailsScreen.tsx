import {fontSizes} from '@config/theme/fonts';
import {gaps} from '@config/theme/gaps';
import {useMovieById} from '@hooks/use-movie-by-id';
import {StackParamList} from '@navigation/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {StyleSheet, Text, useWindowDimensions} from 'react-native';
import {DetailsScreenHeader} from './components/DetailsScreenHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {CastComponent} from '@components/Cast';
import {Loader} from '@components/Loader/Loader';
import {Similars} from '@components/Similars';
import {MovieHeader} from './components/MovieHeader';
import {useEffect, useRef} from 'react';
import {Theme} from '@config/theme/theme';

interface Props extends StackScreenProps<StackParamList, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {
  const {movieId} = route.params;
  const {movie, cast, similars, isLoading} = useMovieById(movieId);
  const {width, height} = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  }, [movieId]);

  if (isLoading) {
    return <Loader size="large" />;
  }

  return (
    <ScrollView style={{width, ...styles.content}} ref={scrollViewRef}>
      <DetailsScreenHeader
        backdrop={movie?.backdrop}
        rating={movie?.voteAverage || 0}
        title={movie?.title || ''}
        {...{height}}
      />
      {movie && <MovieHeader movie={movie} />}

      {movie?.description && (
        <>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.subTitle}>{movie?.description}</Text>
        </>
      )}

      <CastComponent cast={cast} />
      <Similars movies={similars} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    ...Theme.background,
    flex: 1,
  },
  title: {
    fontSize: fontSizes.s,
    alignSelf: 'flex-start',
    paddingLeft: gaps.xs,
    fontWeight: 'bold',
    ...Theme.textPrimary,
  },
  subTitle: {
    fontSize: fontSizes.xs,
    textAlign: 'justify',
    marginBottom: gaps.s,
    padding: gaps.xs,
    ...Theme.textSecondary,
  },
});
