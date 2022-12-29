import {useMutation } from '@apollo/client'
import { NEWREVIEW } from '../graphql/mutations'

const useNewReview = () => {
    const [newReview, result] = useMutation(NEWREVIEW);

    const createReview = async ({ownerName, rating, repositoryName, text}) => {
        console.log(`${ownerName} ${rating} ${repositoryName} ${text}`)
        let intRating = parseInt(rating)
        let id = await newReview({variables: {ownerName, rating: intRating, repositoryName, text}})
        return id
    }

    return [createReview, result]
}

export default useNewReview