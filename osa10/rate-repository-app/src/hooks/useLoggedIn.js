import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

const useRepositories = async () => {

  const { data, error, loading } = useQuery(GET_ME)

  console.log({ data, loading })
  return { data, loading };
};

export default useRepositories;