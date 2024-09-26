import {Movie} from '@core/entities/movie.entity';
import {useMovies} from '@hooks/use-movies';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

export const HomeScreen = () => {
  const {nowPlaying, isLoading} = useMovies();
  console.log(nowPlaying[0]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {nowPlaying.map(({id, title, description, poster, rating}: Movie) => (
          <View key={id}>
            <Image source={{uri: poster}} width={100} height={100} />
            <Text>
              {title} {rating}
            </Text>
            <Text>{description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
