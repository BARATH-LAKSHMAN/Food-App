import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MapPinIcon, PhoneIcon, StarIcon } from "react-native-heroicons/solid";
import KitchenMenu from "../components/KitchenMenu";
import KitchenFoodDisplay from "../components/KitchenFoodDisplay";
import PrebookFoodDisplay from "../components/PrebookFoodDisplay";
import Basket from "../components/Basket";

const PrebookKitchen = ({route}) => {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1">
      <Image
        source={require("../assets/foodDisplay/idly.jpg")}
        className="w-full h-80"
      />
      <View
        className="absolute left-[36.5%] bg-black opacity-50 rounded-lg"
        style={{
          marginTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <Text className="text-xl text-center font-bold p-2">
          {route.params.name}
        </Text>
      </View>
      <Text
        className="absolute text-xl text-center w-full font-bold text-primary pt-2"
        style={{
          marginTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        {route.params.name}
      </Text>
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
            Select dishes
          </Text>
          <ScrollView showsVerticalScrollIndicator={false} className="mb-24">
            <PrebookFoodDisplay
              name="Idly"
              img={require("../assets/foodDisplay/idly.jpg")}
            />
            <PrebookFoodDisplay
              name="Dosa"
              img={require("../assets/foodDisplay/dosa.jpg")}
            />
            <PrebookFoodDisplay
              name="Pongal"
              img={require("../assets/foodDisplay/pongal.jpg")}
            />
            <PrebookFoodDisplay
              name="Chapathi"
              img={require("../assets/foodDisplay/chapathi.jpg")}
            />
            <PrebookFoodDisplay
              name="Parota"
              img={require("../assets/foodDisplay/parota.webp")}
            />
            <PrebookFoodDisplay
              name="Poori"
              img={require("../assets/foodDisplay/poori.jpg")}
            />
          </ScrollView>
        </View>
      </View>
      <Basket />
    </View>
  );
};

export default PrebookKitchen;
