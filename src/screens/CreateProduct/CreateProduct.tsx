import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';
import Input from '../../components/TextInput/TextInput';

const CreateProduct: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const addIngredient = async () => {
    if (!inputValue.length) {
      return;
    }

    firestore().collection('Ingredients').add({
      name: inputValue,
    });
  };

  return (
    <ScreenContainer>
      <Input
        value={inputValue}
        onChangeValue={setInputValue}
        placeholder={"Enter the product's name"}
      />
    </ScreenContainer>
  );
};

export default CreateProduct;
