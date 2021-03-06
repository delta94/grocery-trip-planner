import React, {useState} from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Input from '../../../components/Input/Input';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import Button from '../../../components/Button/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import ListItem from '../../../components/ListItem/ListItem';
import {Ingredient} from '../../../types/Ingredient';
import {Product} from '../../../types/Product';
import {productStore} from '../../../stores/products/ProductStore';
import ListItemWithQuantity from '../../../components/ListItemWithQuantity/ListItemWithQuantity';
import {recipeStore} from '../../../stores/recipes/RecipeStore';
import {RecipeStackParamList} from '../../../navigators/RecipeStackNavigator/RecipeStackNavigator';

interface Props {
  navigation: StackNavigationProp<RecipeStackParamList, 'CreateRecipe'>;
}

const CreateRecipe: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const isValidRecipe = () =>
    !!name.length || !!description.length || !!ingredients.length;

  const onPressCreateRecipe = () => {
    if (isValidRecipe()) {
      recipeStore.createRecipe(name, description, ingredients);
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
              ? {...item, quantity: item.quantity + 1}
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
      <ListItemWithQuantity quantity={item.quantity}>
        {product.name}
      </ListItemWithQuantity>
    ) : (
      <ListItem>Product missing</ListItem>
    );
  };

  return (
    <ScreenContainer>
      <Input
        value={name}
        onChangeText={setName}
        size={'large'}
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
          style={styles.flatList}
          data={ingredients}
          keyExtractor={(item) => item.productKey}
          renderItem={renderIngredient}
        />
      ) : null}

      <Button onPress={openAddIngredientPage}>Add ingredient</Button>

      <Button onPress={onPressCreateRecipe} disabled={!isValidRecipe()}>
        Create recipe
      </Button>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginBottom: 12,
  },
});

export default CreateRecipe;
