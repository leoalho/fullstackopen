import {useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'
import useAuthStorage from '../hooks/useAuthStorage'

const useSignIn = () => {
    const [authenticate, result] = useMutation(AUTHENTICATE);
    
    const authStorage = useAuthStorage();

    const signIn = async ({ username, password }) => {
        let token = await authenticate({ variables: { username: username, password: password}})
        return token
    };
  
    return [signIn, result];
  };

export default useSignIn