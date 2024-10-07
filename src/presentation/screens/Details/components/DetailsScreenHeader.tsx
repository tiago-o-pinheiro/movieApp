import {Rating} from '@components/Rating';
import {fontSizes} from '@config/theme/fonts';
import {gaps} from '@config/theme/gaps';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Image, Platform, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface DetailsScreenHeaderProps {
  backdrop?: string;
  height: number;
  rating: number;
  title: string;
}

export const DetailsScreenHeader = ({
  backdrop,
  height,
  rating,
  title,
}: DetailsScreenHeaderProps) => {
  const {top} = useSafeAreaInsets();
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
          top,
        }}>
        <Pressable onPress={navigation.goBack} style={styles.goBackButton}>
          <Text style={{alignSelf: 'flex-start', paddingTop: gaps.xxxxs}}>
            <Icon name="arrow-back" size={20} color="white" />
          </Text>
          <Text style={styles.title}>{title}</Text>
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
    padding: gaps.xxs,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: fontSizes.s,
    fontWeight: 'bold',
  },
  goBackButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: gaps.xs,
  },
});
