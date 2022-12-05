import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../../theme';

const styles = StyleSheet.create({
    language: {
      backgroundColor: theme.colors.primary,
      color: 'white',
      alignSelf: 'flex-start'
    }
  });

const UpperRight = ({item}) => {
    return(
        <View>
            <Text>{`${item.fullName}`}</Text>
            <Text>{`${item.description}`}</Text>
            <Text style={styles.language}>{`${item.language}`}</Text>
        </View>
        
    )
}

export default UpperRight