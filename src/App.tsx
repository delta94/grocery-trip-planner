import React, {useEffect} from 'react';
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
import AddIngredient from './screens/Recipes/AddIngredient/AddIngredient';
import {productStore} from './stores/products/ProductStore';
import {recipeStore} from './stores/recipes/RecipeStore';

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
  AddIngredient: {
    onGoBack: (product: Product) => void;
  };
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
      <RecipeStack.Screen name="AddIngredient" component={AddIngredient} />
    </RecipeStack.Navigator>
  );
};

const App: () => React.ReactNode = () => {
  useEffect(() => {
    //TODO optimize subbing to firestore.
    productStore.subscribe();
    recipeStore.subscribe();
  }, []);

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
