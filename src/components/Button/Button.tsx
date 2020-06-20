import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

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
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 32,
    padding: 16,
    backgroundColor: 'lightgreen',
  },
});

export default Button;
