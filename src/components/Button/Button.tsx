import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const Button: React.FC<any> = ({children, onPress, disabled}) => {
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
