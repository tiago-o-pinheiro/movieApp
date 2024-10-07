import {gaps} from '@config/theme/gaps';
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

interface PosterProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  onPress: () => void;
}

export const Poster = ({
  src,
  alt,
  width = 320,
  height = 440,
  onPress,
}: PosterProps) => {
  if (!src) {
    return null;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        width,
        height,
        opacity: pressed ? 0.5 : 1,
        ...styles.pressable,
      })}>
      <View style={styles.container}>
        <Image source={{uri: src}} alt={alt} style={styles.image} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: '#818181',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 9,
    borderRadius: 10,
  },
  image: {
    flex: 1,
    objectFit: 'cover',
    borderRadius: 10,
  },
  pressable: {
    marginHorizontal: gaps.xxxs,
    paddingHorizontal: gaps.xxxxs,
  },
});
