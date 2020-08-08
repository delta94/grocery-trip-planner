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
import {RouteProp} from '@react-navigation/native';

interface Props {
  route: RouteProp<RecipeStackParamList, 'EditRecipe'>;
  navigation: StackNavigationProp<RecipeStackParamList, 'EditRecipe'>;
}

const EditRecipe: React.FC<Props> = ({route, navigation}) => {
  const [name, setName] = useState<string>(route.params.name);
  const [description, setDescription] = useState<string>(
    route.params.description,
  );
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    route.params.ingredients,
  );

  const isValidRecipe = () =>
    !!name.length || !!description.length || !!ingredients.length;

  const onPressUpdateRecipe = () => {
    if (isValidRecipe()) {
      recipeStore.updateRecipe(
        route.params.key,
        name,
        description,
        ingredients,
      );
      navigation.navigate('RecipeDetail', {
        key: route.params.key,
        name,
        description,
        ingredients,
      });
    }
  };

  const onPressDeleteRecipe = () => {
    recipeStore.deleteRecipe(route.params.key);
    navigation.navigate('RecipeList');
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

      <Button onPress={onPressUpdateRecipe} disabled={!isValidRecipe()}>
        Update recipe
      </Button>

      <Button onPress={onPressDeleteRecipe}>Delete recipe</Button>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginBottom: 12,
  },
});

export default EditRecipe;
