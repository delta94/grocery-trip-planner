import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  View,
  Text,
} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';

const ProductList: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState<any>([]);

  const addIngredient = async () => {
    if (!inputValue.length) {
      return;
    }

    firestore().collection('Ingredients').add({
      name: inputValue,
    });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Ingredients')
      .onSnapshot((querySnapshot) => {
        const result: any = [];

        querySnapshot.forEach((documentSnapshot) => {
          result.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setIngredients(result);
        setIsLoading(false);
      });

    return () => subscriber();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScreenContainer>
      <TextInput
        placeholder="Enter ingredient"
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Add ingredient" onPress={addIngredient} />
      <FlatList
        style={styles.list}
        data={ingredients}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 80,
    width: '100%',
    textAlign: 'center',
  },
  list: {
    margin: 30,
  },
});

export default ProductList;
