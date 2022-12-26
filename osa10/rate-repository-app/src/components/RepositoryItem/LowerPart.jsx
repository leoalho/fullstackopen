import { View, StyleSheet, Button } from 'react-native';
import Text from '../Text';
import * as Linking from 'expo-linking';


const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  text: {
    textAlign: 'center',
  }
});

const clicked = () => {
    Linking.openURL(item.url);
}

const LowerPart = ({item}) => {
    return(
        <View style={styles.flexContainer}>
        <View>
            <Text fontWeight="bold" fontSize="subheading" style={styles.text}>{`${Math.round(item.stargazersCount/100)/10} k`}</Text>
            <Text style={styles.text}>Stars</Text>
        </View>
        <View>
            <Text fontWeight="bold" fontSize="subheading" style={styles.text}> {`${Math.round(item.forksCount/100)/10} k`}</Text>
            <Text style={styles.text}>Forks</Text>
        </View>
        <View>
            <Text fontWeight="bold" fontSize="subheading" style={styles.text}> {`${item.reviewCount}`}</Text>
            <Text style={styles.text}>Reviews</Text>
        </View>
        <View>
            <Text fontWeight="bold" fontSize="subheading" style={styles.text}>{`${item.ratingAverage}`}</Text>
            <Text style={styles.text}>Rating</Text>
        </View>
        </View>

    )
}

export default LowerPart