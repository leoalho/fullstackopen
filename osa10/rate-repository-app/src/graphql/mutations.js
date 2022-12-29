import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
    mutation authenticate($username: String!, $password: String!){
        authenticate(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`;

export const SIGNUP = gql`
    mutation Mutation($username: String!, $password: String! ) {
        createUser(user: {username: $username, password: $password}) {
            username
        }
    }
`;

export const NEWREVIEW = gql`
    mutation createReview($ownerName: String!, $rating: Int!, $repositoryName: String!, $text: String) {
        createReview(review: {
            ownerName: $ownerName,
            rating: $rating,
            repositoryName: $repositoryName,
            text: $text
        }){
            repository {
                id
            }
        }
    }
`;

export const DELETEREVIEW = gql`
    mutation Mutation($deleteReviewId: ID!) {
        deleteReview(id: $deleteReviewId)
    }
`;