import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";

const PrebookFoodDisplay = () => {
  return (
    <View className="bg-veg h-24 mx-4 mt-4 mb-1 rounded-lg overflow-hidden flex-row shadow-md shadow-maroon">
      <View>
        <Image
          source={require("../assets/foodDisplay/idly.jpg")}
          className="w-28 h-24"
        />
        <View className="absolute flex-row bottom-0 items-center justify-center bg-primary w-full p-1 opacity-50">
          <TouchableOpacity>
            <Text className="bg-secondary rounded-full h-8 w-8 text-center text-lg font-bold">
              -
            </Text>
          </TouchableOpacity>
          <Text className="text-xl mx-2 text-center">1</Text>
          <TouchableOpacity>
            <Text className="bg-secondary rounded-full h-8 w-8 text-center text-lg font-bold">
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View className="absolute flex-row bottom-0 items-center justify-center w-full p-1">
          <TouchableOpacity>
            <Text className="bg-secondary rounded-full h-8 w-8 text-center text-lg font-bold">
              -
            </Text>
          </TouchableOpacity>
          <Text className="text-xl mx-2 text-center">1</Text>
          <TouchableOpacity>
            <Text className="bg-secondary rounded-full h-8 w-8 text-center text-lg font-bold">
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="ml-2">
        <Text className="font-bold text-xl border-b-2 border-dashed border-primary w-60 p-1">
          Dish Name
        </Text>
        <View className="flex-row justify-between p-2">
          <View className="w-40">
            <Text>anjcjkshchsd vjdhsv sdgfhdshfhd</Text>
          </View>
          <View>
            <Text>
              Rs <Text className="text-primary">40</Text>
            </Text>
            <View className="flex-row">
              <StarIcon size={20} color="black" />
              <Text className="text-primary">4</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PrebookFoodDisplay;
