import React, {useEffect, useState, useLayoutEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Button, ActivityIndicator, FlatList, Text} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';
import ListItem from '../../components/ListItem/ListItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {RecipeStackParamList} from '../../App';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Recipe} from '../../types/Recipe';

type RecipeListNavigationProp = StackNavigationProp<
  RecipeStackParamList,
  'RecipeList'
>;

interface Props {
  navigation: RecipeListNavigationProp;
}

const RecipeList: React.FC<Props> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState<any>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => console.log('navigate to create recipe')}
          title="Add"
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Recipes')
      .onSnapshot((querySnapshot) => {
        const result: any = [];

        querySnapshot.forEach((documentSnapshot) => {
          result.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setRecipes(result);
        setIsLoading(false);
      });

    return () => subscriber();
  }, []);

  const navigateToRecipeDetail = (recipe: Recipe) => {
    console.log('navigate to recipe details');
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScreenContainer>
      <FlatList
        data={recipes}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToRecipeDetail(item)}>
            <ListItem>
              <Text>{item.name}</Text>
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
};

export default RecipeList;
