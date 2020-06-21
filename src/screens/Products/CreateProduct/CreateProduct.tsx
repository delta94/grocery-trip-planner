import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Input from '../../../components/Input/Input';
import {Text} from 'react-native';
import Button from '../../../components/Button/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductStackParamList} from '../../../App';
import {productStore} from '../../../stores/products/ProductStore';

type CreateProductNavigationProp = StackNavigationProp<
  ProductStackParamList,
  'CreateProduct'
>;

interface Props {
  navigation: CreateProductNavigationProp;
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
