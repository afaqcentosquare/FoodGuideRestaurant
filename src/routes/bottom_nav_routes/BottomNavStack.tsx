import React from 'react' ;
import {createStackNavigator} from "@react-navigation/stack";

export type HomeStackParamList = {
  Home : undefined,
  Orders : undefined,
  Camera : undefined,
  Inbox : undefined,
  Profile : undefined
}

export const BottomNavStack = createStackNavigator<HomeStackParamList>();
