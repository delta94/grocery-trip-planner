import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import ProductList from './screens/ProductList/ProductList';
import ProductDetail from './screens/ProductDetail/ProductDetail';
import CreateProduct from './screens/CreateProduct/CreateProduct';
import {Product} from './types/Product';
import RecipeList from './screens/RecipeList/RecipeList';

const Tab = createBottomTabNavigator();
const ProductStack = createStackNavigator();
const RecipeStack = createStackNavigator();

export type ProductStackParamList = {
  ProductList: undefined;
  CreateProduct: undefined;
  ProductDetail: Product;
};

export type RecipeStackParamList = {
  RecipeList: undefined;
};

const ProductStackNavigator = () => {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen name="ProductList" component={ProductList} />
      <ProductStack.Screen name="ProductDetail" component={ProductDetail} />
      <ProductStack.Screen name="CreateProduct" component={CreateProduct} />
    </ProductStack.Navigator>
  );
};

const RecipeStackNavigator = () => {
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen name="RecipeList" component={RecipeList} />
    </RecipeStack.Navigator>
  );
};

const App: () => React.ReactNode = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Recipes" component={RecipeStackNavigator} />
        <Tab.Screen name="Products" component={ProductStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
