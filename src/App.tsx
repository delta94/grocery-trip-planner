import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {productStore} from './stores/products/ProductStore';
import {recipeStore} from './stores/recipes/RecipeStore';
import {MainTabNavigator} from './navigators/MainTabNavigator/MainTabNavigator';

const App: () => React.ReactNode = () => {
  useEffect(() => {
    //TODO optimize subbing to firestore.
    productStore.subscribe();
    recipeStore.subscribe();
  }, []);

  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
};

export default App;
