import {fontSizes} from '@config/theme/fonts';
import {gaps} from '@config/theme/gaps';
import {useMovieById} from '@hooks/use-movie-by-id';
import {StackParamList} from '@navigation/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {DetailsScreenHeader} from './components/DetailsScreenHeader';
import {Formatter} from '@config/helpers/formatter';
import {ScrollView} from 'react-native-gesture-handler';
import {CastComponent} from '@components/Cast';
import {Loader} from '@components/Loader/Loader';
import {Similars} from '@components/Similars';

interface Props extends StackScreenProps<StackParamList, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {
  const {movieId} = route.params;
  const {movie, cast, similars, isLoading} = useMovieById(movieId);
  const {width, height} = useWindowDimensions();

  if (isLoading) {
    return <Loader size="large" />;
  }

  return (
    <ScrollView style={{width, flex: 1}}>
      <DetailsScreenHeader
        backdrop={movie?.backdrop}
        rating={movie?.voteAverage || 0}
        {...{height}}
      />
      <View style={styles.content}>
        <Image
          source={{uri: movie?.poster}}
          style={{
            height: height * 0.2,
            width: width * 0.3,
          }}
        />
        <View style={{width: width * 0.6}}>
          <Text
            style={{
              fontSize: fontSizes.m,
              marginBottom: gaps.xxxs,
              fontWeight: 'bold',
            }}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {movie?.title}
          </Text>
          <View style={styles.genresContainer}>
            {movie?.genres.map(genre => (
              <Text key={genre.id} style={styles.genrePill}>
                {genre.name}
              </Text>
            ))}
          </View>

          <Text
            style={{
              fontSize: fontSizes.xs,
              marginBottom: gaps.xxs,
            }}>
            Budget: {Formatter.currency(movie?.budget || 0)}
          </Text>
          <Text
            style={{
              fontSize: fontSizes.xs,
              marginBottom: gaps.xxs,
            }}
            numberOfLines={1}
            adjustsFontSizeToFit>
            Release Date: {Formatter.date(movie?.releaseDate)}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: fontSizes.s,
          alignSelf: 'flex-start',
          paddingLeft: gaps.xs,
          fontWeight: 'bold',
        }}>
        Description
      </Text>
      <Text
        style={{
          fontSize: fontSizes.xs,
          textAlign: 'justify',
          marginBottom: gaps.s,
          padding: gaps.xs,
        }}>
        {movie?.description}
      </Text>

      <CastComponent cast={cast} />
      <Similars movies={similars} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: gaps.xs,
    padding: gaps.xs,
  },
  genresContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: gaps.xs,
    marginBottom: gaps.xxs,
  },
  genrePill: {
    fontSize: fontSizes.xxs,
    color: 'white',
    backgroundColor: 'black',
    width: 'auto',
    textAlign: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    padding: gaps.xxxxs,
  },
});
