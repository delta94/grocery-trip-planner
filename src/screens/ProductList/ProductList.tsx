import React, {useEffect, useState, useLayoutEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';
import ListItem from '../../components/ListItem/ListItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductStackParamList} from '../../App';

type ProductListNavigationProp = StackNavigationProp<
  ProductStackParamList,
  'CreateProduct'
>;

interface Props {
  navigation: ProductListNavigationProp;
}

const ProductList: React.FC<Props> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState<any>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('CreateProduct')}
          title="Add"
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Ingredients')
      .onSnapshot((querySnapshot) => {
        const result: any = [];

        querySnapshot.forEach((documentSnapshot) => {
          result.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setIngredients(result);
        setIsLoading(false);
      });

    return () => subscriber();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScreenContainer>
      <FlatList
        data={ingredients}
        renderItem={({item}) => (
          <ListItem>
            <Text>{item.name}</Text>
          </ListItem>
        )}
      />
    </ScreenContainer>
  );
};

export default ProductList;
