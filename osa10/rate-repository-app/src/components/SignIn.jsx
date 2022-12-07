import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../../theme';

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
        margin: 3
    },
    signInText: {
        color: 'white',
        textAlign: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'Black',
        margin: 3,
        padding: 3
    }
  });

const SignInForm = ({ onSubmit }) => {
    return (
      <View style={styles.view}>
        <View style={styles.textInput}>
        <FormikTextInput name="username" placeholder="Username" />
        </View>
        <View style={styles.textInput}>
        <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
        </View>
        <View style={styles.signInView}>
        <Pressable onPress={onSubmit}>
            <Text style={styles.signInText}>Sign in</Text>
        </Pressable>
        </View>
      </View>
    );
  };

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
    };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn