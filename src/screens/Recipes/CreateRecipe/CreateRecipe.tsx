import React, {useState} from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Input from '../../../components/Input/Input';
import {Text, FlatList, View, ListRenderItem} from 'react-native';
import Button from '../../../components/Button/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {RecipeStackParamList} from '../../../App';
import ListItem from '../../../components/ListItem/ListItem';
import {Ingredient} from '../../../types/Ingredient';
import {Product} from '../../../types/Product';
import {productStore} from '../../../stores/products/ProductStore';

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

  const onPressCreateRecipe = () => {
    if (isValidRecipeName(name)) {
      navigation.navigate('RecipeList');
    }
  };

  const addIngredient = (product: Product) => {
    const isProductOnList = !!ingredients.find(
      (item: Ingredient) => item.productKey === product.key,
    );

    isProductOnList
      ? setIngredients(
          ingredients.map((item: Ingredient) =>
            item.productKey === product.key
              ? {...item, quantity: item.quantity++}
              : item,
          ),
        )
      : setIngredients([
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

  const renderIngredient: ListRenderItem<Ingredient> = ({item}) => {
    const product = productStore.getProductByKey(item.productKey);

    return product ? (
      <ListItem>
        <Text>{product.name}</Text>
      </ListItem>
    ) : (
      <ListItem>
        <Text>Product missing</Text>
      </ListItem>
    );
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
          renderItem={renderIngredient}
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
