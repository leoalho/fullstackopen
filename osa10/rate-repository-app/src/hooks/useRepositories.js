//import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = async () => {
  //const [repositories, setRepositories] = useState();
  //const [loading, setLoading] = useState(false);
  const { data, error, loading } = useQuery(GET_REPOSITORIES)
  //setRepositories(data);

/*
  const fetchRepositories = async () => {
    setLoading(true);
    const { data, error, loading } = useQuery(GET_REPOSITORIES);
    //const response = await fetch('http://192.168.0.6:5000/api/repositories');
    const json = await data.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);
*/
  console.log({ data, loading })
  return { data, loading };
};

export default useRepositories;