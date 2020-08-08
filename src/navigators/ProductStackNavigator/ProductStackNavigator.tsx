import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Product} from '../../types/Product';
import ProductList from '../../screens/Products/ProductList/ProductList';
import ProductDetail from '../../screens/Products/ProductDetail/ProductDetail';
import CreateProduct from '../../screens/Products/CreateProduct/CreateProduct';
import EditProduct from '../../screens/Products/EditProduct/EditProduct';

const ProductStack = createStackNavigator();

export type ProductStackParamList = {
  ProductList: undefined;
  CreateProduct: undefined;
  ProductDetail: Product;
  EditProduct: Product;
};

export const ProductStackNavigator = () => (
  <ProductStack.Navigator>
    <ProductStack.Screen
      name="ProductList"
      component={ProductList}
      options={{title: 'Products'}}
    />
    <ProductStack.Screen
      name="ProductDetail"
      component={ProductDetail}
      options={{title: 'Product'}}
    />
    <ProductStack.Screen
      name="CreateProduct"
      component={CreateProduct}
      options={{title: 'Add a product'}}
    />
    <ProductStack.Screen
      name="EditProduct"
      component={EditProduct}
      options={{title: 'Edit product'}}
    />
  </ProductStack.Navigator>
);
