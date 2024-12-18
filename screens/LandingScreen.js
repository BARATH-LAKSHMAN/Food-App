import React from "react";
import HomeTabScreen from "./HomeTabScreen";
import ProductsTabScreen from "./ProductsTabScreen";
import OrdersTabScreen from "./OrdersTabScreen";
import AccountTabScreen from "./AccountTabScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ArrowRightEndOnRectangleIcon,
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const LandingScreen = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            marginBottom: 4,
            marginTop: 2,
            fontSize: 13,
            fontWeight: 800,
          },
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            borderRadius: 10,
            paddingHorizontal: 4,
            paddingTop: 10,
            backgroundColor: "#EDEDED",
          },
          tabBarActiveTintColor: "#FF7400",
          tabBarAllowFontScaling: true,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeTabScreen}
          options={{
            tabBarIcon: ({ color }) => <HomeIcon color={color} size={26} />,
          }}
        />
        <Tab.Screen
          name="Products"
          component={ProductsTabScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <ArrowRightEndOnRectangleIcon color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrdersTabScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <CalendarDaysIcon color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountTabScreen}
          options={{
            tabBarIcon: ({ color }) => <UserIcon color={color} size={26} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default LandingScreen;
