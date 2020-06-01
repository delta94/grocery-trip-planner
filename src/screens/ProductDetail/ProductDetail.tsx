import React from 'react';
import {Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductStackParamList} from '../../App';
import {RouteProp} from '@react-navigation/native';

interface Props {
  route: RouteProp<ProductStackParamList, 'ProductDetail'>;
  navigation: StackNavigationProp<ProductStackParamList, 'ProductDetail'>;
}

const ProductDetail: React.FC<Props> = ({route, navigation}) => {
  return <Text>{route.params.productId}</Text>;
};

export default ProductDetail;
