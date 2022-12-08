import {  Pressable, View, StyleSheet } from 'react-native';
import Text from './Text'
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
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
    signInView: {
        backgroundColor: theme.colors.primary,
        padding: 7,
        margin: 6,
        borderRadius: 5
    },
    signInText: {
        color: 'white',
        textAlign: 'center'
    },
  });

const SignInForm = ({ onSubmit }) => {
    return (
      <View style={styles.view}>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
        <View style={styles.signInView}>
        <Pressable onPress={onSubmit}>
            <Text style={styles.signInText}>Sign in</Text>
        </Pressable>
        </View>
      </View>
    );
  };


const SignIn = () => {
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
        const { data } = await signIn({ username, password });
        console.log(data);
        } catch (e) {
        console.log(e);
        }
    };

  return (
    <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn