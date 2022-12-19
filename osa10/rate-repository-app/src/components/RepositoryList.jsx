import { FlatList, View, StyleSheet } from 'react-native';
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

export const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
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
  
  const RepositoryList = () => {
    const { repositories } = useRepositories();
  
    return <RepositoryListContainer repositories={repositories} />;
  };


export default RepositoryList;