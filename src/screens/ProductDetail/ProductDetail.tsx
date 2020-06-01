import React from 'react';
import {Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductStackParamList} from '../../App';

type ProductListNavigationProp = StackNavigationProp<
  ProductStackParamList,
  'ProductDetail'
>;

interface Props {
  navigation: ProductListNavigationProp;
}

const ProductDetail: React.FC<Props> = () => {
  return <Text>Product Detail</Text>;
};

export default ProductDetail;
