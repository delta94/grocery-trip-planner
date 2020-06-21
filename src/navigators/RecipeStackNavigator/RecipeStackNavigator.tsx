import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Product} from '../../types/Product';
import RecipeList from '../../screens/Recipes/RecipeList/RecipeList';
import CreateRecipe from '../../screens/Recipes/CreateRecipe/CreateRecipe';
import AddIngredient from '../../screens/Recipes/AddIngredient/AddIngredient';

const RecipeStack = createStackNavigator();

export type RecipeStackParamList = {
  RecipeList: undefined;
  CreateRecipe: undefined;
  AddIngredient: {
    onGoBack: (product: Product) => void;
  };
};

export const RecipeStackNavigator = () => (
  <RecipeStack.Navigator>
    <RecipeStack.Screen
      name="RecipeList"
      component={RecipeList}
      options={{title: 'Cookbook'}}
    />
    <RecipeStack.Screen
      name="CreateRecipe"
      component={CreateRecipe}
      options={{title: 'Create a recipe'}}
    />
    <RecipeStack.Screen
      name="AddIngredient"
      component={AddIngredient}
      options={{title: 'Add an ingredient'}}
    />
  </RecipeStack.Navigator>
);
