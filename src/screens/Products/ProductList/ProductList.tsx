import React, {useEffect, useState, useLayoutEffect} from 'react';
import {observer} from 'mobx-react';
import firestore from '@react-native-firebase/firestore';
import {Button, ActivityIndicator, FlatList, Text} from 'react-native';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import ListItem from '../../../components/ListItem/ListItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductStackParamList} from '../../../App';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Product} from '../../../types/Product';
import {productStore} from '../../../stores/products/ProductStore';

type ProductListNavigationProp = StackNavigationProp<
  ProductStackParamList,
  'ProductList'
>;

interface Props {
  navigation: ProductListNavigationProp;
}

const ProductList: React.FC<Props> = ({navigation}) => {
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

  const navigateToProductDetail = (product: Product) => {
    navigation.navigate('ProductDetail', product);
  };

  return (
    <ScreenContainer>
      <FlatList
        data={productStore.products}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToProductDetail(item)}>
            <ListItem>
              <Text>{item.name}</Text>
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
};

export default observer(ProductList);
