import React from 'react';
import {View, StyleSheet} from 'react-native';

const ListItem: React.FC = ({children}) => (
  <View style={styles.listItem}>{children}</View>
);

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});

export default ListItem;
