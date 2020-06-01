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
import {TouchableOpacity} from 'react-native-gesture-handler';

type ProductListNavigationProp = StackNavigationProp<
  ProductStackParamList,
  'CreateProduct'
>;

interface Props {
  navigation: ProductListNavigationProp;
}

const ProductList: React.FC<Props> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any>([]);

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

  const navigateToProductDetail = (productId: string) => {
    navigation.navigate('ProductDetail', {productId});
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScreenContainer>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToProductDetail(item.key)}>
            <ListItem>
              <Text>{item.name}</Text>
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
};

export default ProductList;
