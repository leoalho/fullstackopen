import { View, StyleSheet } from 'react-native';
import Text from '../Text';
import theme from '../../../theme';

const styles = StyleSheet.create({
    languageText: {
      color: 'white',
    },
    languageView: {
        backgroundColor: theme.colors.primary,
      padding: 5,
      alignSelf: 'flex-start',
      borderRadius: 5
    }
  });

const UpperRight = ({item}) => {
    return(
        <View>
            <Text fontWeight="bold" fontSize="subheading">{`${item.fullName}`}</Text>
            <Text>{`${item.description}`}</Text>
            <View style={styles.languageView}><Text style={styles.languageText}>{`${item.language}`}</Text></View>
            
        </View>
        
    )
}

export default UpperRight