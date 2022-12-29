import { FlatList, View, StyleSheet } from 'react-native';
import { Link } from "react-router-native";
//import {Text} from './Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator= () => <View style={styles.separator} />;

const Header = (sortBy, setSortBy) => {
    
    return (
        <Picker
            selectedValue={sortBy.value}
            onValueChange={(itemValue, itemIndex) => {
                if (itemValue==="latest"){
                    setSortBy({value: "latest", orderBy: "CREATED_AT", orderDirection: "DESC"})
                }
                if (itemValue==="highest"){
                    setSortBy({value: "highest", orderBy: "RATING_AVERAGE", orderDirection: "DESC"})
                }
                if (itemValue==="lowest"){
                    setSortBy({value: "lowest", orderBy: "RATING_AVERAGE", orderDirection: "ASC"})
                }
            }}>
            <Picker.Item label="Latest" value="latest" />
            <Picker.Item label="Highest rated" value="highest" />
            <Picker.Item label="Lowest rated" value="lowest" />
        </Picker>
    )
}

const renderItem = ({item}) => {
    return(
        <Link to={`./repositories/${item.id}`}>
        <RepositoryItem  item={item} button={false}/>
        </Link>
    )
}

export const RepositoryListContainer = ({ repositories, sortBy, setSortBy }) => {

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
        ListHeaderComponent={Header(sortBy, setSortBy)}
      />
    );
  };
  
  const RepositoryList = () => {
    const [sortBy, setSortBy] = useState({orderBy: "CREATED_AT", orderDirection: "DESC"});
    const { repositories } = useRepositories(sortBy);
  
    return <RepositoryListContainer repositories={repositories} sortBy={sortBy} setSortBy={setSortBy} />;
  };


export default RepositoryList;