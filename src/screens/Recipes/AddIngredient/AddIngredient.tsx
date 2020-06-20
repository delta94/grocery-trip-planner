import {RecipeStackParamList} from '../../../App';
import firestore from '@react-native-firebase/firestore';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {Product} from '../../../types/Product';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import ListItem from '../../../components/ListItem/ListItem';
import {RouteProp} from '@react-navigation/native';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

interface Props {
  navigation: StackNavigationProp<RecipeStackParamList, 'AddIngredient'>;
  route: RouteProp<RecipeStackParamList, 'AddIngredient'>;
}

const AddIngredient: React.FC<Props> = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Products')
      .onSnapshot((querySnapshot) => {
        const result: any = [];

        querySnapshot.forEach((documentSnapshot) => {
          result.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setProducts(result);
        setIsLoading(false);
      });

    return () => subscriber();
  }, []);

  const selectProduct = (product: Product) => {
    route.params.onGoBack(product);
    navigation.goBack();
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScreenContainer>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => selectProduct(item)}>
            <ListItem>
              <Text>{item.name}</Text>
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
};

export default AddIngredient;
