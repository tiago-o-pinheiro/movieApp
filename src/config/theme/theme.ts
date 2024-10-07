import {StyleSheet} from 'react-native';
import {palette} from './colors';

export const Theme = StyleSheet.create({
  background: {
    backgroundColor: palette.BLACK,
  },
  textPrimary: {
    color: palette.GRAY_LIGHTER,
  },
  textSecondary: {
    color: palette.GRAY_LIGHT,
  },
});
