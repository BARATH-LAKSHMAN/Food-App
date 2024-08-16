import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MapPinIcon, PhoneIcon, StarIcon } from "react-native-heroicons/solid";
import KitchenMenu from "../components/KitchenMenu";

const KitchenDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1">
      <Image
        source={require("../assets/foodDisplay/idly.jpg")}
        className="w-full h-80"
      />
      <View
        className="absolute left-[31%] bg-[#00000075] rounded-lg"
        style={{
          marginTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <Text className="text-xl text-center font-bold p-2 text-primary">Kitchen Name</Text>
      </View>
      <View className="bg-primary flex-1">
        <View className="flex-row justify-between p-3 bg-nonveg">
          <View className="flex-row items-center">
            <MapPinIcon size={20} color="black" />
            <Text className="text-primary ml-1">Location</Text>
          </View>
          <View className="flex-row items-center">
            <PhoneIcon size={16} color="black" />
            <Text className="text-primary ml-2">829292791</Text>
          </View>
          <View className="flex-row">
            <StarIcon size={20} color="black" />
            <Text className="text-primary">4</Text>
          </View>
        </View>
        <View>
          <Text className="text-center w-full border-b border-b-maroon text-lg font-semibold p-2">
            This week's menu
          </Text>
          <ScrollView showsVerticalScrollIndicator={false} className="h-96">
            <KitchenMenu />
            <KitchenMenu />
            <KitchenMenu />
            <KitchenMenu />
            <KitchenMenu />
            <KitchenMenu />
            <KitchenMenu />
          </ScrollView>
          <View className="m-4 bg-nonveg rounded-lg shadow-lg shadow-black">
            <TouchableOpacity>
              <Text className="text-xl p-3 text-center font-bold  text-primary">
                Subscribe for Rs 1200
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default KitchenDetailsScreen;
