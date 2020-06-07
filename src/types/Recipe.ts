import {Ingredient} from './Ingredient';

export interface Recipe {
  key: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
}
