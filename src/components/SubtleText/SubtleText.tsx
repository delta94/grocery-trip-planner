import React from 'react';
import {StyleSheet, Text} from 'react-native';

const SubtleText: React.FC = ({children}) => (
  <Text style={styles.subtleText}>{children}</Text>
);

const styles = StyleSheet.create({
  subtleText: {
    color: 'lightgrey',
    fontSize: 12,
    marginBottom: 6,
  },
});

export default SubtleText;
