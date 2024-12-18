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
        <KitchenDisplay name="A's kitchen" />
        <KitchenDisplay name="B's kitchen" />
        <KitchenDisplay name="C's kitchen" />
        <KitchenDisplay name="D's kitchen" />
        <KitchenDisplay name="E's kitchen" />
        <KitchenDisplay name="F's kitchen" />
      </ScrollView>
      <Basket />
    </View>
  );
};

export default Kitchen;
