import { View, Text, ScrollView } from "react-native";
import React from "react";
import KitchenDisplay from "../components/KitchenDisplay";
import SearchBar from "../components/SearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Basket from "../components/Basket";

const Kitchen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-primary">
      <View
        className="bg-secondary"
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View className="mx-4 mb-5">
          <SearchBar placeholder="Search restaurant..." />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KitchenDisplay />
        <KitchenDisplay />
        <KitchenDisplay />
        <KitchenDisplay />
        <KitchenDisplay />
        <KitchenDisplay />
      </ScrollView>
      <Basket />
    </View>
  );
};

export default Kitchen;
