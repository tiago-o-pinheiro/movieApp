import {gaps} from '@config/theme/gaps';
import {View, Text, StyleSheet, Image} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import {Cast, Movie} from '@core/entities/movie.entity';
import {fontSizes} from '@config/theme/fonts';

type MOVIE_PROPS = {
  title: string;
  poster?: string;
};

const MovieCard = ({title, poster}: MOVIE_PROPS) => {
  if (!poster) return null;
  return (
    <View
      style={{marginHorizontal: gaps.xxxs, height: 220, width: 90, flex: 1}}>
      <Image
        source={{uri: poster}}
        style={{
          height: 150,
          width: 90,
          borderRadius: 5,
        }}
      />
      <Text style={{textAlign: 'left'}}>{title}</Text>
    </View>
  );
};

export const Similars = ({movies}: {movies?: Movie[]}) => {
  return (
    <View style={{paddingBottom: gaps.s, flex: 1}}>
      <Text
        style={{
          fontSize: fontSizes.s,
          alignSelf: 'flex-start',
          paddingLeft: gaps.xs,
          fontWeight: 'bold',
          marginBottom: gaps.xs,
        }}>
        Similar Movies
      </Text>
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={({id}, index) => `${id}-${index}`}
        renderItem={({item}) => (
          <MovieCard title={item.title} poster={item.poster} />
        )}
      />
    </View>
  );
};
