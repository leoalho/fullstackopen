import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query{
        repositories {
            edges {
                node {
                id
                fullName
                language
                description
                ratingAverage
                reviewCount
                stargazersCount
                ownerAvatarUrl
                }
            }
        }
    }
`;

export const GET_SINGLE_REPOSITORY = gql`
    query Repository($id: ID!){
        repository(id: $id) {
        id
        url
        fullName
        language
        description
        ratingAverage
        reviewCount
        stargazersCount
        ownerAvatarUrl
        reviews {
            edges {
              node {
                id
                text
                rating
                createdAt
                user {
                  id
                  username
                }
              }
            }
          }
    }
}
`

export const GET_ME = gql`
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        text
                        createdAt
                        rating
                        repository {
                        id
                        fullName
                        }
                    }
                }
            }
        }
    }
`;
/*
    query{
        me{
            id
            username
        }
    }
`;
*/