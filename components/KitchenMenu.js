import { View, Text } from "react-native";
import React from "react";

const KitchenMenu = () => {
  return (
    <View className="m-4 bg-veg rounded-lg p-4 flex-row justify-between items-center">
      <View>
        <Text className="text-lg font-semibold text-primary">Monday</Text>
      </View>
      <View className="border-x border-green border-dashed">
        <View className="flex-1 mx-4 py-1 border-b border-green border-dashed">
          <View className="flex-row items-center">
            <Text className="border-r border-green border-dashed">Brfast </Text>
            <View className="ml-3">
              <Text>Idly x3</Text>
              <Text>Fish Curry x1</Text>
            </View>
          </View>
        </View>
        <View className="flex-1 mx-4 py-1 border-b border-green border-dashed">
          <View className="flex-row items-center">
            <Text className="border-r border-green border-dashed">Lunch </Text>
            <View className="ml-3">
              <Text>Idly x3</Text>
              <Text>Fish Curry x1</Text>
            </View>
          </View>
        </View>
        <View className="flex-1 mx-4 py-1">
          <View className="flex-row items-center">
            <Text className="border-r border-green border-dashed">Dinner </Text>
            <View className="ml-3">
              <Text>Idly x3</Text>
              <Text>Fish Curry x1</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text className="text-lg font-semibold text-primary">Rs 400</Text>
      </View>
    </View>
  );
};

export default KitchenMenu;
