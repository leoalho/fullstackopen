import { View, StyleSheet, ScrollView } from 'react-native';
import Text from './Text'
import theme from '../../theme';
import Constants from 'expo-constants';
import { Link } from "react-router-native";
import LoggButton from './LoggButton';

const styles = StyleSheet.create({
  container: {
    paddingTop: 2*Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary
  },
  textView: {
    paddingHorizontal: 10
  },
  text: {
    color: theme.colors.appBar,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <ScrollView horizontal>
            <View style={styles.textView}><Link to="./"><Text fontSize='subheading' style={styles.text}>Repositories</Text></Link></View>
            <LoggButton />
        </ScrollView>
        
    </View>)
};

export default AppBar;