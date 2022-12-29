import { View, StyleSheet, Pressable  } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../../theme';
import * as yup from 'yup';
import useNewReview from '../hooks/useNewReview';
import { useNavigate } from "react-router-native";
import { useApolloClient } from '@apollo/client';

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Owner name is required'),
    repoName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .min(0)
        .max(100)
        .required('Rating is required'),
});

const initialValues = {
    ownerName: '',
    repoName: '',
    rating: '',
    review: ''
}

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

export const CreateReviewForm = ({onSubmit}) => {
    return (
        <View style={styles.view}>
          <FormikTextInput name="ownerName" placeholder="Repository owner name" />
          <FormikTextInput name="repoName" placeholder="Repository name" />
          <FormikTextInput name="rating" placeholder="rating" />
          <FormikTextInput name="review" placeholder="review" />
          <View style={styles.signInView}>
          <Pressable onPress={onSubmit}>
              <Text style={styles.signInText}>Create a review</Text>
          </Pressable>
          </View>
        </View>
      );
}

const CreateReview = () => {

    const [newReview] = useNewReview();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { ownerName, repoName, rating, review } = values;
        try {
          const result = await newReview({ownerName, rating, repositoryName: repoName, text: review});
          id = result.data.createReview.repository.id
          //console.log(id)
          path = `/repositories/${id}`
          //console.log(path)
          navigate(path)

        } catch (e) {
          console.log(e);
        }
    };

    return (
      <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    );
};

export default CreateReview