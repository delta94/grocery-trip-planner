import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';
import Input from '../../components/TextInput/TextInput';
import {Text} from 'react-native';
import Button from '../../components/Button/Button';

const CreateProduct: React.FC<any> = ({navigation}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const isValidProductName = (value: string) => !!value.length;

  const addIngredient = async () => {
    firestore().collection('Ingredients').add({
      name: inputValue,
    });
  };

  const onPressCreateProduct = () => {
    if (isValidProductName(inputValue)) {
      addIngredient();
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
        isDisabled={!isValidProductName(inputValue)}>
        <Text>Create product</Text>
      </Button>
    </ScreenContainer>
  );
};

export default CreateProduct;
