import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const FoodDisplay = () => {
  const Navigation = useNavigation();
  return (
    <View className="w-36 h-36 mt-6 bg-veg  rounded-xl shadow-lg shadow-maroon overflow-hidden">
      <TouchableOpacity onPress={()=>Navigation.navigate("KitchenFood")}>
        <Image
          source={require("../assets/foodDisplay/idly.jpg")}
          className="h-36 w-36 relative z-0"
        />
        <View className="absolute bottom-0 bg-veg opacity-30 w-full p-1 z-40">
          <Text className="text-xl font-semibold text-center">Idly</Text>
        </View>
        <Text className="text-xl font-semibold text-center absolute bottom-1 z-40 left-[38%] text-primary">Idly</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FoodDisplay;
