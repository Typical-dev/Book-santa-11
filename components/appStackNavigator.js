import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import DonateScreen from "../screens/donateScreen";
import RecieverDetailsScreen from "../screens/recieverDetails";

export const AppStackNavigator = createStackNavigator(
  {
    BookDonateList: {
      screen: DonateScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    reciverDetails: {
      screen: RecieverDetailsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  { initialRouteName: BookDonateList }
);
