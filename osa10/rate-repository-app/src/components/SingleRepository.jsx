import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { useSingleRespository } from "../hooks/useRepositories";
import {View, StyleSheet, FlatList} from 'react-native';
import Text from "./Text";
import { format } from "date-fns";

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
    leftText: {
        borderColor: 'black',
        borderWidth: 1,
        padding:5,
        margin: 20,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        width: 36,
        borderRadius: 18,
        borderColor: '#0366d6',
        borderWidth: 2,
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        padding: 10,
        margin: 5
      },
      rightText: {
        padding: 5,
        margin: 15,
        //borderColor: 'black',
        //borderWidth: 1,
      }
  });
  
  const ItemSeparator= () => <View style={styles.separator} />;

const SingleRepository = () => {
    const { id } = useParams();
    const { repository } = useSingleRespository(id);

    
    if (!repository){
        return <View><Text>Loading...</Text></View>
    }

    const reviews = repository.reviews;

    const reviewNodes = reviews.edges.map((edge) => edge.node)

    return (
        <FlatList
          data={reviewNodes}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => <RepositoryItem item={repository} button={true}/>}
          ItemSeparatorComponent={ItemSeparator}
        />
    )

}

const ReviewItem = ({ review }) => {
    return(
        <View style={styles.flexContainer}>
            <View style={styles.leftText}>
                <Text fontWeight="bold" style={{color: "#0366d6"}}>{review.rating}</Text>
            </View>
            <View style={styles.rightText}>
                <Text fontWeight="bold">{review.user.username}</Text>
                <Text>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    )
};

export default SingleRepository
