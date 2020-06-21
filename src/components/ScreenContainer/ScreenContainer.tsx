import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet, View} from 'react-native';

const ScreenContainer: React.FC = ({children}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.containerView}>{children}</View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerView: {
    padding: 16,
  },
});

export default ScreenContainer;
