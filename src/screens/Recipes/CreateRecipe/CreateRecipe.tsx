import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Input from '../../../components/Input/Input';
import {Text} from 'react-native';
import Button from '../../../components/Button/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {RecipeStackParamList} from '../../../App';

type CreateRecipeNavigationProp = StackNavigationProp<
  RecipeStackParamList,
  'CreateRecipe'
>;

interface Props {
  navigation: CreateRecipeNavigationProp;
}

const CreateRecipe: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const isValidRecipeName = (value: string) => !!value.length;

  const addRecipe = async () => {
    firestore().collection('Recipes').add({
      name: name,
    });
  };

  const onPressCreateRecipe = () => {
    if (isValidRecipeName(name)) {
      addRecipe();
      navigation.navigate('RecipeList');
    }
  };

  return (
    <ScreenContainer>
      <Input
        value={name}
        onChangeText={setName}
        placeholder={"Enter the recipe's name"}
      />
      <Input
        value={description}
        onChangeText={setDescription}
        multiLine={true}
        placeholder={"Enter the recipe's description"}
      />
      <Button onPress={onPressCreateRecipe} disabled={!isValidRecipeName(name)}>
        <Text>Create recipe</Text>
      </Button>
    </ScreenContainer>
  );
};

export default CreateRecipe;
