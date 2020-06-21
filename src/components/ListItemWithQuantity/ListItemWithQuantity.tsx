import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface ListItemWithQuantity {
  quantity: number;
}

const ListItemWithQuantity: React.FC<ListItemWithQuantity> = ({
  children,
  quantity,
}) => (
  <View style={styles.listItem}>
    <Text>{children}</Text>
    <Text>{quantity}</Text>
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});

export default ListItemWithQuantity;
