import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductStackParamList} from '../../../App';
import {RouteProp} from '@react-navigation/native';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Title from '../../../components/Title/Title';
import SubtleText from '../../../components/SubtleText/SubtleText';

interface Props {
  route: RouteProp<ProductStackParamList, 'ProductDetail'>;
  navigation: StackNavigationProp<ProductStackParamList, 'ProductDetail'>;
}

const ProductDetail: React.FC<Props> = ({route, navigation}) => (
  <ScreenContainer>
    <Title>{route.params.name}</Title>
    <SubtleText>{route.params.key}</SubtleText>
  </ScreenContainer>
);

export default ProductDetail;