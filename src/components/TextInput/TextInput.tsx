import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}

const Input: React.FC<Props> = ({value, onChangeText, placeholder}) => {
  return (
    <TextInput
      style={styles.input}
      value={value.length ? value : undefined}
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
