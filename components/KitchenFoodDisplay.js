import { View, Text, Image, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { StarIcon } from "react-native-heroicons/solid";
import cartStore from "../stores/CartStore";
import { observer } from "mobx-react-lite";

const KitchenFoodDisplay = observer((props) => {
  const handleCounter = (value) => {
    if (value>0) {
      cartStore.addItem({kname: props.kname, name: props.name});
    } else {
      cartStore.removeItem({kname: props.kname, name: props.name});
    }
  };
  const counter = cartStore.cart.find(
    (item) => item.kname === props.kname && item.name === props.name
  )?.quantity || 0;
  return (
    <View className="bg-veg h-32 mx-4 mt-4 mb-1 rounded-lg overflow-hidden flex-row shadow-md shadow-maroon">
      <View>
        <Image
          source={props.img}
          className="w-28 h-32"
        />
        <View className="absolute flex-row bottom-0 items-center justify-center bg-[#fffbdc9e] w-full p-1">
          <TouchableOpacity onPress={() => handleCounter(-1)}>
            <Text className="bg-secondary rounded-full h-8 w-8 text-center text-lg font-bold">
              -
            </Text>
          </TouchableOpacity>
          <Text className="text-xl mx-2 text-center">
            {counter}
          </Text>
          <TouchableOpacity onPress={() => handleCounter(1)}>
            <Text className="bg-secondary rounded-full h-8 w-8 text-center text-lg font-bold">
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="ml-2">
        <Text className="font-bold text-xl border-b-2 border-dashed border-primary w-60 p-1">
          {props.kname}
        </Text>
        <View className="flex-row justify-between p-2">
          <View>
            <Text>
              {props.name} <Text className="text-primary">x2</Text>
            </Text>
            <Text>
              Chutney <Text className="text-primary">x1</Text>
            </Text>
            <Text>
              Sambhar <Text className="text-primary">x1</Text>
            </Text>
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
});

export default KitchenFoodDisplay;
