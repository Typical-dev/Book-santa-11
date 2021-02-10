import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { AppTabNavigator } from "./appTabNavigator";
import { CustomSideBarMenu } from "./customSideBarMenu";
import SettingScreen from "../screens/settingScreen";
import MyDonations from "../screens/myDonations";
import NotificationScreen from "../screens/notificationScreen";
import MyReceivedBooksScreen from "../screens/recievedBooks";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: AppTabNavigator },
    Setting: { screen: SettingScreen },
    Notifications: { screen: NotificationScreen },
    MyDonations: { screen: MyDonations },
    MyRecievedBooks: {screen: MyReceivedBooksScreen},
  },
  { contentComponent: CustomSideBarMenu },
  { initialRouteName: "Home" }
);
