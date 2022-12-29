import theme from '../../../theme';
import useLoggedIn from '../../hooks/useLoggedIn';
import { View, StyleSheet} from 'react-native';
import Text from '../Text';
import Constants from 'expo-constants';
import { Link } from "react-router-native";

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

const CreateReviewButton = () => {
    const loggedIn = useLoggedIn();

    try {
        if (loggedIn && loggedIn.data.me){
            return <View style={styles.textView}><Link to="./CreateReview"><Text fontSize='subheading' style={styles.text}>Create Review</Text></Link></View>
        }
    } catch (e){
    }
}

export const MyReviewsButton = () => {
    const loggedIn = useLoggedIn();

    try {
        if (loggedIn && loggedIn.data.me){
            return <View style={styles.textView}><Link to="./MyReviews"><Text fontSize='subheading' style={styles.text}>My Reviews</Text></Link></View>
        }
    } catch (e){
    }
}

export default CreateReviewButton