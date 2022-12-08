import { FlatList, Text, View, StyleSheet } from 'react-native';
//import {Text} from './Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator= () => <View style={styles.separator} />;

const renderItem = ({item}) => {
    return(
        <RepositoryItem  item={item} />
    )
}


const RepositoryList = () => {
    const repositories = useRepositories();
    //console.log(repositories)
    if (repositories._z.loading){
        return(
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    const repositoryNodes = repositories
        ? repositories._z.data.repositories.edges.map(edge => edge.node)
        : [];

  return (
    <FlatList
      key={(item) => item.id}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;