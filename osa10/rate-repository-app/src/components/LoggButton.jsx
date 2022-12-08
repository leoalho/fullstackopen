import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text'
import theme from '../../theme';
import Constants from 'expo-constants';
import { Link } from "react-router-native";
import useLoggedIn from '../hooks/useLoggedIn';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

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

const LoggButton = () => {
    const authstorage = useAuthStorage();
    const client = useApolloClient();
    const loggedIn = useLoggedIn();
    console.log(loggedIn)
    const onSubmit = async () => {
        await authstorage.removeAccessToken()
        client.resetStore()
    }

    try {
        if (loggedIn.data.me){
            return <View style={styles.textView}><Pressable onPress={onSubmit}><Text fontSize='subheading' style={styles.text}>Sign out</Text></Pressable></View>
        }
    } catch (e){
        console.error(e)
    }
    return <View style={styles.textView}><Link to="./signin"><Text fontSize='subheading' style={styles.text}>Sign in</Text></Link></View>
}

export default LoggButton