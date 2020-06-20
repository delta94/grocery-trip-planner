import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiLine?: boolean;
}

const Input: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  multiLine = false,
}) => {
  return (
    <TextInput
      style={styles.input}
      value={value.length ? value : undefined}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline={multiLine}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 32,
    padding: 16,
    borderWidth: 1,
    textAlignVertical: 'top',
    borderColor: 'grey',
  },
});

export default Input;
