import React, {useState} from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {productStore} from '../../../stores/products/ProductStore';
import {ProductStackParamList} from '../../../navigators/ProductStackNavigator/ProductStackNavigator';
import {RouteProp} from '@react-navigation/native';

interface Props {
  route: RouteProp<ProductStackParamList, 'EditProduct'>;
  navigation: StackNavigationProp<ProductStackParamList, 'EditProduct'>;
}

const EditProduct: React.FC<Props> = ({route, navigation}) => {
  const [inputValue, setInputValue] = useState<string>(route.params.name);

  const isValidProductName = (value: string) => !!value.length;

  const onPressUpdateProduct = () => {
    if (isValidProductName(inputValue)) {
      productStore.updateProduct(route.params.key, inputValue);
      navigation.navigate('ProductDetail', {
        key: route.params.key,
        name: inputValue,
      });
    }
  };

  const onPressDeleteProduct = () => {
    productStore.deleteProduct(route.params.key);
    navigation.navigate('ProductList');
  };

  return (
    <ScreenContainer>
      <Input
        value={inputValue}
        size={'large'}
        onChangeText={setInputValue}
        placeholder={"Enter the product's name"}
      />
      <Button
        onPress={onPressUpdateProduct}
        disabled={!isValidProductName(inputValue)}>
        Update product
      </Button>
      <Button onPress={onPressDeleteProduct}>Delete product</Button>
    </ScreenContainer>
  );
};

export default EditProduct;
