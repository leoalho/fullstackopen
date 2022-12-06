import {StyleSheet, View} from 'react-native';
import theme from '../../theme';
import LowerPart from './LowerPart';
import UpperPart from './UpperPart';


const styles = StyleSheet.create({
    view: {
        backgroundColor: '#ffffff'
    },
    text: {
      fontSize: theme.fontSizes.body
    },
    tinyLogo: {
        width: 50,
        height: 50,
      }
  });

const RepositoryItem = ({item}) => {
    return(
    <View style={styles.view}>
    <UpperPart item={item} />
    <LowerPart item={item}/>
    </View>)
}

export default RepositoryItem