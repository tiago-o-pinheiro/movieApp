import {gaps} from '@config/theme/gaps';
import {View, Text, StyleSheet, Image} from 'react-native';

import {FlatList, Pressable} from 'react-native-gesture-handler';
import {Movie} from '@core/entities/movie.entity';
import {fontSizes} from '@config/theme/fonts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '@navigation/StackNavigator';
import {Theme} from '@config/theme/theme';

type MOVIE_PROPS = {
  title: string;
  movieId: number;
  poster?: string;
};

const MovieCard = ({title, poster, movieId}: MOVIE_PROPS) => {
  const navigator = useNavigation<NavigationProp<StackParamList>>();
  if (!poster) return null;
  return (
    <Pressable
      style={styles.movieCardContainer}
      onPress={() => navigator.navigate('Details', {movieId})}>
      <Image source={{uri: poster}} style={styles.movieImage} />
      <Text style={{textAlign: 'left', flexGrow: 1, ...Theme.textSecondary}}>
        {title}
      </Text>
    </Pressable>
  );
};

export const Similars = ({movies}: {movies?: Movie[]}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Similar Movies</Text>
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={({id}, index) => `${id}-${index}`}
        renderItem={({item}) => (
          <MovieCard
            title={item.title}
            poster={item.poster}
            movieId={item.id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginBottom: gaps.s,
    flex: 1,
  },
  title: {
    fontSize: fontSizes.s,
    alignSelf: 'flex-start',
    paddingLeft: gaps.xs,
    fontWeight: 'bold',
    marginBottom: gaps.xs,
    ...Theme.textPrimary,
  },
  movieCardContainer: {
    marginHorizontal: gaps.xxxs,
    minHeight: 220,
    width: 90,
    height: '100%',
  },
  movieImage: {
    height: 150,
    width: 90,
    borderRadius: 5,
    marginBottom: gaps.xxs,
  },
});
