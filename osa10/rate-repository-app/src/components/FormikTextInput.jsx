import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 6,
    color: 'red'
  },
  textInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
    margin: 6,
    padding: 3,
    borderRadius: 5
  },
  normalInput: {
    borderColor: 'black',
  },
  errorInput: {
    borderColor: 'red',
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
    <View style={[styles.textInput, showError ? styles.errorInput : styles.normalInput]}>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      </View>
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;