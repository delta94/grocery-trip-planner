import React, {useLayoutEffect} from 'react';
import {observer} from 'mobx-react';
import {Button, FlatList} from 'react-native';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import ListItem from '../../../components/ListItem/ListItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Product} from '../../../types/Product';
import {productStore} from '../../../stores/products/ProductStore';
import {ProductStackParamList} from '../../../navigators/ProductStackNavigator/ProductStackNavigator';

interface Props {
  navigation: StackNavigationProp<ProductStackParamList, 'ProductList'>;
}

const ProductList: React.FC<Props> = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('CreateProduct')}
          title="Add"
        />
      ),
    });
  }, [navigation]);

  const navigateToProductDetail = (product: Product) => {
    navigation.navigate('ProductDetail', product);
  };

  return (
    <ScreenContainer>
      <FlatList
        data={productStore.products}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToProductDetail(item)}>
            <ListItem>{item.name}</ListItem>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
};

export default observer(ProductList);
