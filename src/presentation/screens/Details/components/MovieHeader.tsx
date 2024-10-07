import {Genres} from '@components/Genres';
import {Formatter} from '@config/helpers/formatter';
import {fontSizes} from '@config/theme/fonts';
import {gaps} from '@config/theme/gaps';
import {Theme} from '@config/theme/theme';
import {MovieDetail} from '@core/entities/movie.entity';
import {useWindowDimensions, View, Image, Text, StyleSheet} from 'react-native';

export const MovieHeader = ({movie}: {movie: MovieDetail}) => {
  const {height} = useWindowDimensions();

  return (
    <View style={styles.content}>
      <Image
        source={{uri: movie?.poster}}
        style={{
          ...styles.movieImage,
          height: 200,
          objectFit: 'contain',
        }}
      />
      <View style={styles.movieContent}>
        <Text style={styles.movieTitle} numberOfLines={1} adjustsFontSizeToFit>
          {movie?.title}
        </Text>
        <Genres genres={movie?.genres || []} />
        <Text style={styles.detailsTitle}>
          Budget: {Formatter.currency(movie?.budget || 0)}
        </Text>

        <Text style={styles.detailsTitle}>
          Release Date: {Formatter.date(movie?.releaseDate)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: gaps.xs,
    paddingHorizontal: gaps.xs,
    paddingBottom: gaps.s,
    flex: 1,
  },
  movieImage: {
    width: '100%',
    flex: 1,
  },
  movieContent: {
    flex: 2,
  },
  movieTitle: {
    fontSize: fontSizes.m,
    marginBottom: gaps.xxxs,
    fontWeight: 'bold',
    ...Theme.textPrimary,
  },
  detailsTitle: {
    fontSize: fontSizes.xs,
    marginBottom: gaps.xxs,
    ...Theme.textSecondary,
  },
});
