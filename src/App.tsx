import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import ProductList from './screens/Products/ProductList/ProductList';
import ProductDetail from './screens/Products/ProductDetail/ProductDetail';
import CreateProduct from './screens/Products/CreateProduct/CreateProduct';
import {Product} from './types/Product';
import RecipeList from './screens/Recipes/RecipeList/RecipeList';
import CreateRecipe from './screens/Recipes/CreateRecipe/CreateRecipe';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  CreateRecipe: undefined;
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
      <RecipeStack.Screen name="CreateRecipe" component={CreateRecipe} />
    </RecipeStack.Navigator>
  );
};

const App: () => React.ReactNode = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            switch (route.name) {
              case 'Recipes': {
                return <Ionicons name={'ios-book'} size={size} color={color} />;
              }
              case 'Products':
              default: {
                return (
                  <Ionicons name={'ios-nutrition'} size={size} color={color} />
                );
              }
            }
          },
        })}>
        <Tab.Screen name="Recipes" component={RecipeStackNavigator} />
        <Tab.Screen name="Products" component={ProductStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
