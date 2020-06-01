import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Title: React.FC = ({children}) => (
  <Text style={styles.title}>{children}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    margin: 32,
  },
});

export default Title;
