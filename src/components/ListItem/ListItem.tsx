import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ListItem: React.FC = ({children}) => (
  <View style={styles.listItem}>
    <Text>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});

export default ListItem;
