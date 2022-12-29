import { useMutation } from "@apollo/client";
import { DELETEREVIEW } from "../graphql/mutations";
import { GET_ME} from "../graphql/queries";

const useDeleteReview = () => {
    const [deleteReview, result] = useMutation(DELETEREVIEW,
        {refetchQueries: [
            {query: GET_ME, variables: {includeReviews: true}}
        ]}
    );

    const deleteSingleReview = async (id) => {
        //console.log(id)
        await deleteReview({variables: {deleteReviewId: id}})
    }

    return [deleteSingleReview, result]
}

export default useDeleteReview