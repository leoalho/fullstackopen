import { View, Image, StyleSheet } from 'react-native';
import UpperRight from './UpperRight';

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logoView: {
    padding: 10
  }
});

const UpperPart = ({item}) => {
    return(
        <View style={styles.flexContainer}>
        <View style={styles.logoView}>
        <Image style={styles.tinyLogo} source={{uri: item.ownerAvatarUrl}}/>
        </View>
        <UpperRight item={item} />
        </View>
    )
}

export default UpperPart