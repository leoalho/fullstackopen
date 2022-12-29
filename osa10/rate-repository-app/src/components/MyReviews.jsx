import {  Pressable, View, StyleSheet, FlatList, Alert } from 'react-native';
import Text from './Text'
import useReviews from '../hooks/useReviews';
import { format } from "date-fns";
import theme from '../../theme';
import { Link } from "react-router-native";
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
    leftText: {
        borderColor: 'black',
        borderWidth: 1,
        padding:5,
        margin: 5,
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
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        padding: 10,
      },
      rightText: {
        padding: 5,
        margin: 5,
        marginRight: 35,
        //borderColor: 'black',
        //borderWidth: 1,
        objectFit: 'fill'
      },
      lowbutton: {
        backgroundColor: theme.colors.primary,
        margin: 8,
        padding: 2,
        borderRadius: 5,
        height: 30,
        justifyContent: 'center'
    },
    lowButtonRight: {
        backgroundColor: theme.colors.secondary,
        margin: 8,
        padding: 2,
        borderRadius: 5,
        height: 30,
        justifyContent: 'center'
    },
    lowButtonText: {
        color: 'white',
        textAlign: 'center'
    }
});

const ItemSeparator= () => <View style={styles.separator} />;

const createTwoButtonAlert = (deleter, id) => {

return (
Alert.alert(
  "Delete review",
  "Are you sure you want to delete the review?",
  [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "OK", onPress: () => deleter(id) }
  ]
)
)};

const ReviewItem = ({ review }) => {
    const [deleteSingleReview] = useDeleteReview()
    return(
        <View>
            <View style={styles.flexContainer}>
                <View style={styles.leftText}>
                    <Text fontWeight="bold" style={{color: "#0366d6"}}>{review.rating}</Text>
                </View>
                <View style={styles.rightText}>
                    <Text fontWeight="bold">{review.repository.fullName}</Text>
                    <Text>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
            <View style={styles.flexContainer}>
                <Link to={`../repositories/${review.repository.id}`} style={styles.lowbutton}>
                    <Text style={styles.lowButtonText}>View repository</Text>
                </Link>
                <Pressable onPress={() => createTwoButtonAlert(deleteSingleReview, review.id)} style={styles.lowButtonRight}>
                    <Text style={styles.lowButtonText}>Delete Review</Text>
                </Pressable>
            </View>
            </View>
    )
};
//deleteSingleReview(review.id)

const MyReviews = () => {
    const user = useReviews();

    if (user.loading){
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    const reviews = user.data.me.reviews.edges
    const reviewNodes = reviews.map((edge) => edge.node);
    //console.log(reviewNodes)

    return (
        <FlatList
        data={reviewNodes}
        renderItem={({item}) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        />
    )
}

export default MyReviews