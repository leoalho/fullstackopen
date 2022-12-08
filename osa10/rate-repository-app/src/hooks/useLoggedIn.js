import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

const useLoggedIn = () => {

  const { data, error, loading } = useQuery(GET_ME)

  return { data, loading };
};

export default useLoggedIn;