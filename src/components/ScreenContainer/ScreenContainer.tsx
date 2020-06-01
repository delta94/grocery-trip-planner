import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native';

const ScreenContainer: React.FC = ({children}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ScreenContainer;
