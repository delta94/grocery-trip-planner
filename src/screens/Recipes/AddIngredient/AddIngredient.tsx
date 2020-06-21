import React from 'react';
import {RecipeStackParamList} from '../../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text} from 'react-native';
import {Product} from '../../../types/Product';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import ListItem from '../../../components/ListItem/ListItem';
import {RouteProp} from '@react-navigation/native';
import {YellowBox} from 'react-native';
import {observer} from 'mobx-react';
import {productStore} from '../../../stores/products/ProductStore';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

interface Props {
  navigation: StackNavigationProp<RecipeStackParamList, 'AddIngredient'>;
  route: RouteProp<RecipeStackParamList, 'AddIngredient'>;
}

const AddIngredient: React.FC<Props> = ({navigation, route}) => {
  const selectProduct = (product: Product) => {
    route.params.onGoBack(product);
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <FlatList
        data={productStore.products}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => selectProduct(item)}>
            <ListItem>{item.name}</ListItem>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
};

export default observer(AddIngredient);
