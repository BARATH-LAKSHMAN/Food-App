import { View, Text, ScrollView } from "react-native";
import React from "react";
import "../global.css";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AccountDisplay from "../components/AccountDisplay";

const AccountTabScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="flex-1 bg-veg"
    >
      <View className="m-5">
        <Text className="text-3xl font-bold font-serif text-maroon">
          Barath Lakshman
        </Text>
        <Text>User Id: 1234</Text>
      </View>
      <View className="bg-secondary py-2">
        <AccountDisplay />
        <AccountDisplay />
        <AccountDisplay />
        <AccountDisplay />
      </View>
    </View>
  );
};

export default AccountTabScreen;
