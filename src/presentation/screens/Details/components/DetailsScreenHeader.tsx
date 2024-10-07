import {Rating} from '@components/Rating';
import {fontSizes} from '@config/theme/fonts';
import {gaps} from '@config/theme/gaps';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Image, Platform, Pressable} from 'react-native';

interface DetailsScreenHeaderProps {
  backdrop?: string;
  height: number;
  rating: number;
}

export const DetailsScreenHeader = ({
  backdrop,
  height,
  rating,
}: DetailsScreenHeaderProps) => {
  const platform = Platform.OS;
  const navigation = useNavigation();

  return (
    <View
      style={{
        ...styles.container,
        height: height * 0.25,
      }}>
      <Image
        source={{uri: backdrop}}
        style={{height: height * 0.25, width: '100%', opacity: 0.7}}
      />
      <View
        style={{
          ...styles.backfilter,
        }}
      />
      <View
        style={{
          ...styles.topContainer,
          top: platform === 'ios' ? 35 : 0,
        }}>
        <Pressable onPress={navigation.goBack}>
          <Text
            style={{
              color: 'white',
              fontSize: fontSizes.s,
            }}>
            Return
          </Text>
        </Pressable>
        <Rating rating={rating} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginBottom: gaps.xs,
  },
  backfilter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: gaps.xs,
  },
  topContainer: {
    position: 'absolute',
    padding: gaps.xs,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
