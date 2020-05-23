import React from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

const App: () => React.ReactNode = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Hi</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
