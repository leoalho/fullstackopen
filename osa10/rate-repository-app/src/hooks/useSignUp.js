import {useMutation } from '@apollo/client'
import { SIGNUP } from '../graphql/mutations'

const useSignUp = () => {
    const [createUser, result] = useMutation(SIGNUP);

    const signUp = async ({ username, password }) => {
        await createUser({ variables: { username: username, password: password}})
    };
  
    return [signUp, result];
  };

export default useSignUp