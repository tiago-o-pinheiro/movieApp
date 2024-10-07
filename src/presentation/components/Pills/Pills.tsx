import {palette} from '@config/theme/colors';
import {fontSizes} from '@config/theme/fonts';
import {gaps} from '@config/theme/gaps';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  text: string;
  textColor?: string;
  backgroundColor?: string;
}

export const Pill = ({
  text,
  textColor = palette.WHITE,
  backgroundColor = palette.PRIMARY_REGULAR,
}: Props) => {
  return (
    <View style={{...styles.container, backgroundColor}}>
      <Text style={{color: textColor}}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: fontSizes.xxs,
    color: 'white',
    width: 'auto',
    textAlign: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    padding: gaps.xxxxs,
  },
});
