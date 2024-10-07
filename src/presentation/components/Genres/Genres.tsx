import {Pill} from '@components/Pills';
import {fontSizes} from '@config/theme/fonts';
import {gaps} from '@config/theme/gaps';
import {Genre} from '@infrasctructure/interfaces/movie-db.responses';
import {StyleSheet, View} from 'react-native';

export const Genres = ({genres}: {genres: Genre[]}) => {
  if (!genres) return null;

  return (
    <View style={styles.container}>
      {genres.map(genre => (
        <Pill key={genre.id} text={genre.name} backgroundColor="black" />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: gaps.xs,
    marginBottom: gaps.xxs,
  },
});
