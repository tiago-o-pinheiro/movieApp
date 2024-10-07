import {Color} from '@infrasctructure/types/styles.types';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

interface LoaderProps {
  size: 'small' | 'large';
  color?: Color;
}

export const Loader = ({size, color}: LoaderProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color ?? Color.PRIMARY_REGULAR} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    opacity: 0.9,
  },
});
