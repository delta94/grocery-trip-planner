import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Input from '../../../components/Input/Input';
import {Text, FlatList, View} from 'react-native';
import Button from '../../../components/Button/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {RecipeStackParamList} from '../../../App';
import ListItem from '../../../components/ListItem/ListItem';
import {Ingredient} from '../../../types/Ingredient';
import {Product} from '../../../types/Product';

type CreateRecipeNavigationProp = StackNavigationProp<
  RecipeStackParamList,
  'CreateRecipe'
>;

interface Props {
  navigation: CreateRecipeNavigationProp;
}

const CreateRecipe: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const isValidRecipeName = (value: string) => !!value.length;

  const addRecipe = async () => {
    firestore().collection('Recipes').add({
      name: name,
    });
  };

  const onPressCreateRecipe = () => {
    if (isValidRecipeName(name)) {
      addRecipe();
      navigation.navigate('RecipeList');
    }
  };

  const addIngredient = (product: Product) => {
    setIngredients([
      ...ingredients,
      {
        productKey: product.key,
        quantity: 1,
      },
    ]);
  };

  const openAddIngredientPage = () => {
    navigation.navigate('AddIngredient', {
      onGoBack: addIngredient,
    });
  };

  return (
    <ScreenContainer>
      <Input
        value={name}
        onChangeText={setName}
        placeholder={"Enter the recipe's name"}
      />
      <Input
        value={description}
        onChangeText={setDescription}
        multiLine={true}
        placeholder={"Enter the recipe's description"}
      />

      {ingredients.length ? (
        <FlatList
          data={ingredients}
          keyExtractor={(item) => item.productKey}
          renderItem={({item}) => (
            <ListItem>
              <Text>{item.productKey}</Text>
            </ListItem>
          )}
        />
      ) : null}

      <Button onPress={openAddIngredientPage}>
        <Text>Add ingredient</Text>
      </Button>

      <Button onPress={onPressCreateRecipe} disabled={!isValidRecipeName(name)}>
        <Text>Create recipe</Text>
      </Button>
    </ScreenContainer>
  );
};

export default CreateRecipe;
