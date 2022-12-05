import { View, StyleSheet, Text } from 'react-native';
import theme from '../../theme';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary
  },
  text: {
    color: theme.colors.appBar,
    fontSize: theme.fontSizes.subheading
  }
});

const AppBar = () => {
  return <View style={styles.container}><Text style={styles.text}>Repositories</Text></View>;
};

export default AppBar;