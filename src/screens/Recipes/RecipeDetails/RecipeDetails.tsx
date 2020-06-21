import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Title from '../../../components/Title/Title';
import SubtleText from '../../../components/SubtleText/SubtleText';
import {RecipeStackParamList} from '../../../navigators/RecipeStackNavigator/RecipeStackNavigator';
import {Text} from 'react-native';

interface Props {
  route: RouteProp<RecipeStackParamList, 'RecipeDetail'>;
  navigation: StackNavigationProp<RecipeStackParamList, 'RecipeDetail'>;
}

const RecipeDetail: React.FC<Props> = ({route, navigation}) => (
  <ScreenContainer>
    <Title>{route.params.name}</Title>
    <SubtleText>{route.params.key}</SubtleText>
    <Text>{route.params.description}</Text>
  </ScreenContainer>
);

export default RecipeDetail;
