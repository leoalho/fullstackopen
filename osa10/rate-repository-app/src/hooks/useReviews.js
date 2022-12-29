import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import { DELETEREVIEW } from '../graphql/mutations';

const useReviews = () => {

  const { data, loading, refetch } = useQuery(GET_ME,
    {fetchPolicy: 'cache-and-network', variables: {includeReviews: true}})

  return { data, loading, refetch };
};

export default useReviews;