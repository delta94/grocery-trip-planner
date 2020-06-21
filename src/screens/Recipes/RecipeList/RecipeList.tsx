import React, {useEffect, useState, useLayoutEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Button, ActivityIndicator, FlatList, Text} from 'react-native';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import ListItem from '../../../components/ListItem/ListItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Recipe} from '../../../types/Recipe';
import {observer} from 'mobx-react';
import {recipeStore} from '../../../stores/recipes/RecipeStore';
import {RecipeStackParamList} from '../../../navigators/RecipeStackNavigator/RecipeStackNavigator';

interface Props {
  navigation: StackNavigationProp<RecipeStackParamList, 'RecipeList'>;
}

const RecipeList: React.FC<Props> = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('CreateRecipe')}
          title="Add"
        />
      ),
    });
  }, [navigation]);

  const navigateToRecipeDetail = (recipe: Recipe) => {
    console.log('navigate to recipe details');
  };

  return (
    <ScreenContainer>
      <FlatList
        data={recipeStore.recipes}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToRecipeDetail(item)}>
            <ListItem>{item.name}</ListItem>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
};

export default observer(RecipeList);
