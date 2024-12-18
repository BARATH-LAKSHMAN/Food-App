import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const FoodDisplay = (props) => {
  const Navigation = useNavigation();
  return (
    <View className="w-36 h-36 mt-6 bg-veg  rounded-xl shadow-lg shadow-maroon overflow-hidden">
      <TouchableOpacity
        onPress={() =>
          Navigation.navigate("KitchenFood", {
            data: props,
          })
        }
      >
        <Image source={props.img} className="h-36 w-36 relative z-0" />
        <View className="absolute bottom-0 bg-white w-full p-1 z-40">
          <Text className="text-xl font-semibold text-center">
            {props.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FoodDisplay;
