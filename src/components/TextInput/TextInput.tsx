import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const Input: React.FC<any> = ({value, onChangeText, placeholder}) => {
  return (
    <TextInput
      style={styles.input}
      value={value.length ? value : null}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 32,
    padding: 16,
    borderWidth: 1,
    borderColor: 'grey',
  },
});

export default Input;
