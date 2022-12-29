import { View, StyleSheet, Pressable } from 'react-native';
import Text from '../Text'
import theme from '../../../theme';
import Constants from 'expo-constants';
import { Link } from "react-router-native";
import useLoggedIn from '../../hooks/useLoggedIn';

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

const SignUpButton = () => {
    const loggedIn = useLoggedIn();
    //console.log(loggedIn)
    if (!loggedIn.loading && !loggedIn.data.me){
        return (
            <View style={styles.textView}><Link to="./signup"><Text fontSize='subheading' style={styles.text}>Sign Up</Text></Link></View>
        )
    }
}

export default SignUpButton