import {palette} from '@config/theme/colors';
import {fontSizes} from '@config/theme/fonts';
import {sizes} from '@config/theme/sizes';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Rating = ({rating}: {rating: number}) => {
  if (!rating) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Icon name="star" size={25} color={palette.ALERT_REGULAR} />
      <View style={styles.ratingContainer}>
        <Text
          style={{fontSize: fontSizes.xs, color: 'white', fontWeight: 'bold'}}>
          {rating.toFixed(1)}
        </Text>
        <Text style={{fontSize: fontSizes.xs, color: 'white'}}>/10</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes.xxxxs,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
