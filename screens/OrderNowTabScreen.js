import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React from "react";

import TopSection from "../components/TopSection";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import BfTabScreen from "./subTabScreens/BfTabScreen";
import LunchTabScreen from "./subTabScreens/LunchTabScreen";
import DinnerTabScreen from "./subTabScreens/DinnerTabScreen";
import SearchBar from "../components/SearchBar";

const Tab = createMaterialTopTabNavigator();

const OrderNowTabScreen = () => {
  return (
    <View className="flex-1 bg-primary">
      <SearchBar placeholder="Search food..." />
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
          tabBarActiveTintColor: "#FF7400",
          tabBarInactiveTintColor: "gray",
          tabBarIndicatorStyle: { backgroundColor: "#FF7400" },
          tabBarPressColor: "transparent",
          tabBarPressOpacity: 0,
          tabBarLabelStyle: { fontWeight: 900 },
        }}
      >
        <Tab.Screen name="BreakFast" component={BfTabScreen} />
        <Tab.Screen name="Lunch" component={LunchTabScreen} />
        <Tab.Screen name="Dinner" component={DinnerTabScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default OrderNowTabScreen;