import {gaps} from '@config/theme/gaps';

import {View, Text, StyleSheet, Image} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import {Cast} from '@core/entities/movie.entity';
import {fontSizes} from '@config/theme/fonts';

type ACTOR_PROPS = {
  name: string;
  character?: string;
  avatar: string;
};

const Actor = ({name, character, avatar}: ACTOR_PROPS) => {
  return (
    <View
      style={{marginHorizontal: gaps.xxxs, height: 220, width: 90, flex: 1}}>
      <Image
        source={{uri: avatar}}
        style={{
          height: 150,
          width: 90,
          borderRadius: 5,
        }}
      />
      <Text style={{textAlign: 'left', fontWeight: 'bold'}}>{name}</Text>
      <Text style={{textAlign: 'left'}}>{character}</Text>
    </View>
  );
};

export const CastComponent = ({cast}: {cast?: Cast[]}) => {
  if (!cast) {
    return null;
  }
  return (
    <View style={{paddingBottom: gaps.s}}>
      <Text
        style={{
          fontSize: fontSizes.s,
          alignSelf: 'flex-start',
          paddingLeft: gaps.xs,
          fontWeight: 'bold',
          marginBottom: gaps.xs,
        }}>
        Cast
      </Text>
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
