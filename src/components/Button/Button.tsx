import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, Text} from 'react-native';

interface Props {
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({children, onPress, disabled = false}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.button}
      onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 6,
  },
});

export default Button;
