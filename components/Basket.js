import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { ShoppingCartIcon, XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const Basket = () => {
  const Navigation = useNavigation();
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(!open);
  }
  return (
    <>
      <View className="absolute bg-nonveg right-1 top-[70%] p-3 rounded-full shadow-lg shadow-black ">
        <TouchableOpacity onPress={handleOpen}>
          <ShoppingCartIcon size={20} color="#FEFDED" />
          <Text className="absolute -right-4 -top-4 bg-veg py-0.5 px-2 rounded-full font-semibold text-primary">
            1
          </Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View className="bg-primary mx-10 mt-40 rounded-xl p-2 h-[55%] shadow-lg shadow-black ">
          <View>
            <View className="m-5 flex-row items-center justify-between">
              <Text className="text-3xl font-bold font-serif text-maroon">
                Your Plate
              </Text>
              <TouchableOpacity onPress={handleOpen}>
              <XMarkIcon
                size={20}
                color="#C70039"
                stroke="#C70039"
                strokeWidth={2}
              /></TouchableOpacity>
            </View>
          </View>

          <View className="mx-5">
            <Text className="text-lg font-bold text-green border-b-2 border-nonveg">
              Restaurant Name 1
            </Text>
            <View className="p-2 border-b-2 border-nonveg">
              <View className="flex-row justify-between">
                <Text>Idly x2</Text>
                <Text>Rs 60</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Idly x2</Text>
                <Text>Rs 60</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Idly x2</Text>
                <Text>Rs 60</Text>
              </View>
            </View>

            <View>
              <Text className="text-lg font-bold text-green border-b-2 border-nonveg">
                Restaurant Name 2
              </Text>
              <View className="p-2 border-b-2 border-nonveg">
                <View className="flex-row justify-between">
                  <Text>Idly x2</Text>
                  <Text>Rs 60</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text>Idly x2</Text>
                  <Text>Rs 60</Text>
                </View>
              </View>
            </View>
            <View className="flex-row justify-between border-b-2 border-nonveg items-center">
              <Text className="text-lg font-bold text-green">Total</Text>
              <Text>Rs 400</Text>
            </View>
            <View className="flex-row justify-between border-b-2 border-nonveg items-center">
              <Text className="text-lg font-bold text-green">Delivery</Text>
              <Text>Rs 60</Text>
            </View>
          </View>
          <View className="p-4 bg-secondary rounded-lg mt-10 mx-10 shadow-lg shadow-black">
            <TouchableOpacity>
              <View className="flex-row justify-between w-full">
                <Text className="text-lg font-bold">Proceed to Pay</Text>
                <Text className="text-lg font-bold">Rs 460</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Basket;
