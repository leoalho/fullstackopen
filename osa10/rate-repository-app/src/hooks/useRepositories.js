import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useRepositories = () => {
    const { data, ...result } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
    });
    return { repositories: data ? data.repositories : undefined, ...result };
};

export const useSingleRespository = (id) => {
    const { data, ...result } = useQuery(GET_SINGLE_REPOSITORY, {
        fetchPolicy: 'cache-and-network', variables: {id}
      });
      return { repository: data ? data.repository : undefined, ...result };
};

export default useRepositories;