import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Title from '../../../components/Title/Title';
import SubtleText from '../../../components/SubtleText/SubtleText';
import {RecipeStackParamList} from '../../../navigators/RecipeStackNavigator/RecipeStackNavigator';
import {Text, ListRenderItem, FlatList, StyleSheet} from 'react-native';
import {Ingredient} from '../../../types/Ingredient';
import {productStore} from '../../../stores/products/ProductStore';
import ListItemWithQuantity from '../../../components/ListItemWithQuantity/ListItemWithQuantity';
import ListItem from '../../../components/ListItem/ListItem';

interface Props {
  route: RouteProp<RecipeStackParamList, 'RecipeDetail'>;
  navigation: StackNavigationProp<RecipeStackParamList, 'RecipeDetail'>;
}

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

const RecipeDetail: React.FC<Props> = ({route, navigation}) => (
  <ScreenContainer>
    <Title>{route.params.name}</Title>
    <SubtleText>{route.params.key}</SubtleText>
    <Text>{route.params.description}</Text>

    {route.params.ingredients.length ? (
      <FlatList
        style={styles.flatList}
        data={route.params.ingredients}
        keyExtractor={(item) => item.productKey}
        renderItem={renderIngredient}
      />
    ) : null}
  </ScreenContainer>
);

const styles = StyleSheet.create({
  flatList: {
    marginBottom: 12,
  },
});

export default RecipeDetail;
