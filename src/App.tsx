import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import ProductList from './screens/ProductList/ProductList';
import ProductDetail from './screens/ProductDetail/ProductDetail';
import CreateProduct from './screens/CreateProduct/CreateProduct';

const Tab = createBottomTabNavigator();
const ProductStack = createStackNavigator();

const ProductStackNavigator = () => {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen name="Products" component={ProductList} />
      <ProductStack.Screen name="Product detail" component={ProductDetail} />
      <ProductStack.Screen name="Create product" component={CreateProduct} />
    </ProductStack.Navigator>
  );
};

const App: () => React.ReactNode = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Products" component={ProductStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
