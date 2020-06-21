import {observable, action} from 'mobx';
import firestore from '@react-native-firebase/firestore';
import {Recipe} from '../../types/Recipe';
import {Ingredient} from '../../types/Ingredient';

export interface RecipeStore {
  recipes: Recipe[];
  subscriber: any;

  subscribe: () => void;
  createRecipe: (
    name: string,
    description: string,
    ingredients: Ingredient[],
  ) => void;
}

export const recipeStore = observable<RecipeStore>(
  {
    recipes: [],
    subscriber: null,

    subscribe() {
      this.subscriber = firestore()
        .collection('Recipes')
        .onSnapshot((querySnapshot) => {
          const result: any[] = [];

          querySnapshot.forEach((documentSnapshot) => {
            result.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          this.recipes = result;
        });
    },

    createRecipe: (
      name: string,
      description: string,
      ingredients: Ingredient[],
    ) => {
      firestore().collection('Recipes').add({
        name,
        description,
        ingredients,
      });
    },
  },
  {
    createRecipe: action.bound,
  },
);
