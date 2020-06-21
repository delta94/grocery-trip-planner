import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RecipeStackNavigator} from '../RecipeStackNavigator/RecipeStackNavigator';
import {ProductStackNavigator} from '../ProductStackNavigator/ProductStackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MainTab = createBottomTabNavigator();

export const MainTabNavigator = () => (
  <MainTab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({color, size}) => {
        switch (route.name) {
          case 'Recipes': {
            return <Ionicons name={'ios-book'} size={size} color={color} />;
          }
          case 'Products':
          default: {
            return (
              <Ionicons name={'ios-nutrition'} size={size} color={color} />
            );
          }
        }
      },
    })}>
    <MainTab.Screen
      name="Recipes"
      component={RecipeStackNavigator}
      options={{title: 'Cookbook'}}
    />
    <MainTab.Screen name="Products" component={ProductStackNavigator} />
  </MainTab.Navigator>
);
