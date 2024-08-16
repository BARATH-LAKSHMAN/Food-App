import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import "../global.css";
import ProductDisplay from "../components/ProductDisplay";
import Basket from "../components/Basket";

const ProductsTabScreen = () => {
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
        <View className="m-5">
          <Text className="text-3xl font-bold font-serif text-maroon">
            Home Products
          </Text>
          <Text>Fresh products from our home chefs</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-primary flex-1 mb-4"
      >
        <ProductDisplay />
        <ProductDisplay />
        <ProductDisplay />
        <ProductDisplay />
        <ProductDisplay />
        <ProductDisplay />
        <ProductDisplay />
      </ScrollView>
      <Basket />
    </View>
  );
};

export default ProductsTabScreen;
