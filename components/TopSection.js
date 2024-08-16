import { View, Text, ScrollView, Switch, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const TopSection = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const Navigation = useNavigation();
  return (
    <ScrollView
      className="mt-4"
      horizontal
      contentContainerStyle={{ paddingLeft: 15 }}
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex-row h-12 mr-4 items-center p-2 w-36 border-2 border-secondary rounded-full">
        <Switch
          trackColor={{ false: "#C70039", true: "#C6EBC5" }}
          thumbColor={isEnabled ? "#A1C398" : "#FA7070"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text className="font-medium text-center">Veg Only</Text>
      </View>
      <TouchableOpacity onPress={()=>{Navigation.navigate("Kitchen")}}>
        <Text className="font-medium mr-4 text-center items-center p-2.5 w-36 border-2 border-secondary rounded-full">
          Kitchens
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{Navigation.navigate("Products")}} className="">
        <Text className="font-medium mr-4 text-center items-center p-2.5 w-36 border-2 border-secondary rounded-full">
          Products
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="">
        <Text className="mr-4 font-medium text-center items-center p-2.5 w-36 border-2 border-secondary rounded-full">
          Subscriptions
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TopSection;
