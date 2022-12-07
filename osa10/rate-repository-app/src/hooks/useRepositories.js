import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = async () => {

  const { data, error, loading } = useQuery(GET_REPOSITORIES)

  console.log({ data, loading })
  return { data, loading };
};

export default useRepositories;