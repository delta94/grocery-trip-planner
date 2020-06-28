import React, {useState} from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {productStore} from '../../../stores/products/ProductStore';
import {ProductStackParamList} from '../../../navigators/ProductStackNavigator/ProductStackNavigator';

interface Props {
  navigation: StackNavigationProp<ProductStackParamList, 'CreateProduct'>;
}

const CreateProduct: React.FC<Props> = ({navigation}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const isValidProductName = (value: string) => !!value.length;

  const onPressCreateProduct = () => {
    if (isValidProductName(inputValue)) {
      productStore.addProduct(inputValue);
      navigation.navigate('ProductList');
    }
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
        onPress={onPressCreateProduct}
        disabled={!isValidProductName(inputValue)}>
        Create product
      </Button>
    </ScreenContainer>
  );
};

export default CreateProduct;
