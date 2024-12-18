import { View, Text, TextInput } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../global.css";
import { MapPinIcon } from "react-native-heroicons/solid";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrderNowTabScreen from "./OrderNowTabScreen";
import PrebookTabScreen from "./PrebookTabScreen";

const Tab = createMaterialTopTabNavigator();

const HomeTabScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View className={`flex-1 bg-primary`}>
      <View
        className="bg-secondary"
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View className="mx-5 mt-2 flex-row">
          <Text className="text-3xl font-bold font-serif text-maroon flex-1">
            Hey Barath!!!
          </Text>
          <View className="flex-row justify-center items-center ">
            <MapPinIcon size={30} color="#C70039" />
            <Text className="text-xl font-semibold">Porur</Text>
          </View>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#EDEDED" },
          tabBarActiveTintColor: "#FF7400",
          tabBarInactiveTintColor: "gray",
          tabBarIndicatorStyle: { backgroundColor: "#FF7400" },
          tabBarPressColor: "#C70039",
          tabBarLabelStyle: { fontWeight: 900 },
        }}
      >
        <Tab.Screen name="Order Now" component={OrderNowTabScreen} />
        <Tab.Screen name="Prebook" component={PrebookTabScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default HomeTabScreen;
