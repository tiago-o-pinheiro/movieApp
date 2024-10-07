import {gaps} from '@config/theme/gaps';

import {View, Text, StyleSheet, Image} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import {Cast} from '@core/entities/movie.entity';
import {fontSizes} from '@config/theme/fonts';
import {Theme} from '@config/theme/theme';

type ACTOR_PROPS = {
  name: string;
  character?: string;
  avatar: string;
};

const Actor = ({name, character, avatar}: ACTOR_PROPS) => {
  return (
    <View style={styles.movieCardContainer}>
      <Image source={{uri: avatar}} style={styles.movieImage} />
      <Text
        style={{textAlign: 'left', fontWeight: 'bold', ...Theme.textPrimary}}>
        {name}
      </Text>
      <Text style={{textAlign: 'left', ...Theme.textSecondary}}>
        {character}
      </Text>
    </View>
  );
};

export const CastComponent = ({cast}: {cast?: Cast[]}) => {
  if (!cast) {
    return null;
  }
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Cast</Text>
      <FlatList
        data={cast}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={({id}, index) => `${id}-${index}`}
        renderItem={({item}) => (
          <Actor
            name={item.name}
            character={item.character}
            avatar={item.avatar}
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
