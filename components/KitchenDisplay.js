import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MapPinIcon, PhoneIcon, StarIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const KitchenDisplay = (props) => {
  const Navigation = useNavigation();
  return (
    <View className="bg-veg h-32 mx-4 mt-4 mb-1 rounded-lg shadow-md shadow-maroon">
      <TouchableOpacity onPress={() =>{props.prebook
        ? Navigation.navigate("PrebookKitchenDetails")
        : Navigation.navigate("KitchenDetails");}}>
        <View className="overflow-hidden flex-row">
          <Image
            source={require("../assets/foodDisplay/idly.jpg")}
            className="w-28 h-32 rounded-l-lg"
          />

          <View className="ml-2">
            <Text className="font-bold text-xl border-b-2 border-dashed border-primary w-60 p-1">
              Kitchen Name
            </Text>
            <View className="flex-row justify-between p-3">
              <View>
                <View className="flex-row items-center">
                  <MapPinIcon size={20} color="black" />
                  <Text className="text-primary ml-1">Location</Text>
                </View>
                <View className="flex-row items-center">
                  <PhoneIcon size={16} color="black" />
                  <Text className="text-primary ml-2">829292791</Text>
                </View>
              </View>
              <View>
                <View className="flex-row">
                  <StarIcon size={20} color="black" />
                  <Text className="text-primary">4</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default KitchenDisplay;
