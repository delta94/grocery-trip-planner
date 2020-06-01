import React from 'react';
import {StyleSheet, Text} from 'react-native';

const SubtleText: React.FC = ({children}) => (
  <Text style={styles.subtleText}>{children}</Text>
);

const styles = StyleSheet.create({
  subtleText: {
    color: 'lightgrey',
    margin: 32,
    fontSize: 12,
  },
});

export default SubtleText;
