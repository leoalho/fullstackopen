import {  Pressable, View, StyleSheet } from 'react-native';
import Text from './Text'
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../../theme';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from "react-router-native";
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required')
        .min(1)
        .max(30),
    password: yup
        .string()
        .min(5)
        .max(50)
        .required('Password is required'),
    password2: yup
        .string()
        .required('Password is required')
});

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#ffffff'
    },
    SignUpView: {
        backgroundColor: theme.colors.primary,
        padding: 7,
        margin: 6,
        borderRadius: 5
    },
    SignUpText: {
        color: 'white',
        textAlign: 'center'
    },
  });

export const SignUpForm = ({ onSubmit }) => {
    return (
      <View style={styles.view}>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
        <FormikTextInput name="password2" placeholder="Password again" secureTextEntry/>
        <View style={styles.SignUpView}>
        <Pressable onPress={onSubmit}>
            <Text style={styles.SignUpText}>Sign un</Text>
        </Pressable>
        </View>
      </View>
    );
  };

const SignUp = () => {
    const [SignUp] = useSignUp();
    const [SignIn] = useSignIn();
    const navigate = useNavigate();
    const authstorage = useAuthStorage();
    const client = useApolloClient();

    const onSubmit = async (values) => {
        const { username, password, password2 } = values;
        if (password !== password2){
            return
        }
        try {
            await SignUp({username, password});
            const result = await SignIn({ username, password });
            authstorage.setAccessToken(result.data.authenticate.accessToken)
            client.resetStore()
            console.log(`getAccesToken ${authstorage.getAccessToken()}`)
            navigate("/")
        } catch (e) {
        console.log(e);
        }
    };

  return (
    <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp