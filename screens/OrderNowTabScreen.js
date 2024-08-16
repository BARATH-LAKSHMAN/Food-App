import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React from "react";

import TopSection from "../components/TopSection";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TiffinTabScreen from "./subTabScreens/BfTabScreen";
import RiceTabScreen from "./subTabScreens/LunchTabScreen";
import SnackTabScreen from "./subTabScreens/DinnerTabScreen";
import SearchBar from "../components/SearchBar";

const Tab = createMaterialTopTabNavigator();

const OrderNowTabScreen = () => {
  return (
    <View className="flex-1 bg-primary">
      <SearchBar placeholder="Search food..."/>
      <View>
        <TopSection />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "transparent",
            borderRadius: 10,
            elevation: 0,
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          tabBarIndicatorStyle: { backgroundColor: "green" },
          tabBarPressColor: "transparent",
          tabBarPressOpacity: 0,
          tabBarLabelStyle: { fontWeight: 900 },
        }}
      >
        <Tab.Screen name="BreakFast" component={TiffinTabScreen} />
        <Tab.Screen name="Lunch" component={RiceTabScreen} />
        <Tab.Screen name="Dinner" component={SnackTabScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default OrderNowTabScreen;
