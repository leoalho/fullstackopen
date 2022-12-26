import {StyleSheet, View, Pressable, Text} from 'react-native';
import theme from '../../../theme';
import LowerPart from './LowerPart';
import UpperPart from './UpperPart';
import * as Linking from 'expo-linking';

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
    },
    lowbutton: {
        backgroundColor: theme.colors.primary,
        margin: 8,
        borderRadius: 5,
        height: 30,
        justifyContent: 'center'
    },
    lowButtonText: {
        color: 'white',
        textAlign: 'center'
    }
  });

const RepositoryItem = ({item, button}) => {
    if (button){
        return(
            <View testID="repositoryItem" style={styles.view}>
                <UpperPart item={item} />
                <LowerPart item={item}/>
                <Pressable onPress={() => {Linking.openURL(item.url)}} style={styles.lowbutton}>
                    <Text style={styles.lowButtonText}>Open in github</Text>
                </Pressable>
            </View>) 
    }
    return(
    <View testID="repositoryItem" style={styles.view}>
        <UpperPart item={item} />
        <LowerPart item={item}/>
    </View>)
}

export default RepositoryItem