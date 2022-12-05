import { Text, StyleSheet, Constants} from 'react-native';
import theme from '../../theme';


const styles = StyleSheet.create({
    text: {
      fontSize: theme.fontSizes.body
    }
  });

const RepositoryItem = ({item}) => {
    return(
    <Text style={styles.text}>
        {`Full name: ${item.fullName}
        Description: ${item.description}
        Language: ${item.language}
        Stars: ${item.stargazersCount}
        Forks: ${item.forksCount}
        Reviews: ${item.reviewCount}
        Rating: ${item.ratingAverage}`}
    </Text>)
}

export default RepositoryItem