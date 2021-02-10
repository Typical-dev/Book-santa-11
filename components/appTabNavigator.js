import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import DonateScreen from "../screens/donateScreen";
import RequestScreen from "../screens/requestScreen";
import { AppStackNavigator } from "../components/appStackNavigator";

export const AppTabNavigator = createBottomTabNavigator({
  DonateScreen: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/request-list.png")}
          style={{ width: 20, height: 20 }}
        ></Image>
      ),
      tabBarLabel: "Donate Books",
    },
  },
  RequestScreen: {
    screen: RequestScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/request-book.png")}
          style={{ width: 20, height: 20 }}
        ></Image>
      ),
      tabBarLabel: "Request Books",
    },
  },
});
