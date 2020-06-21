import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  size?: 'medium' | 'large';
  multiLine?: boolean;
}

const Input: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  size = 'medium',
  multiLine = false,
}) => {
  const inputStyle = {
    ...styles.input,
    fontSize: size === 'medium' ? 12 : 24,
  };

  return (
    <TextInput
      style={inputStyle}
      value={value.length ? value : undefined}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline={multiLine}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 12,
    marginBottom: 6,
    textAlignVertical: 'top',
    borderColor: 'grey',
  },
});

export default Input;
