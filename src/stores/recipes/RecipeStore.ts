import {observable} from 'mobx';
import firestore from '@react-native-firebase/firestore';
import {Recipe} from '../../types/Recipe';

export interface RecipeStore {
  recipes: Recipe[];
  subscriber: any;

  subscribe: () => void;
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
  },
  {},
);
