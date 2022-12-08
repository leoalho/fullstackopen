import {useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
    const [authenticate, result] = useMutation(AUTHENTICATE);
  
    const signIn = async ({ username, password }) => {
        let token = await authenticate({ variables: { username: username, password: password}})
        return token
    };
  
    return [signIn, result];
  };

export default useSignIn