import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import React, { useState } from "react";
import { ShoppingCartIcon, XMarkIcon } from "react-native-heroicons/solid";
import { observer } from "mobx-react-lite";
import cartStore from "../stores/CartStore";

const Basket = observer(() => {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  const groupedItems = cartStore.cart.reduce((acc, item) => {
    if (!acc[item.kname]) {
      acc[item.kname] = [];
    }
    acc[item.kname].push(item);
    return acc;
  }, {});

  const totalItems = Object.values(groupedItems).reduce(
    (sum, items) => sum + items.length,
    0
  );

  const isScrollable = totalItems > 3;

  return (
    <>
      <View className="absolute bg-nonveg right-2 top-[70%] p-3 rounded-full shadow-lg shadow-black ">
        <TouchableOpacity onPress={handleOpen}>
          <ShoppingCartIcon size={20} color="#FEFDED" />
          <Text className="absolute -right-4 -top-4 py-0.5 px-2 bg-veg rounded-full font-semibold text-primary">
            {cartStore.totalItems}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={open}>
        <View className="bg-primary mx-10 mt-40 rounded-xl p-2 h-[55%] shadow-lg shadow-black">
          <View className="m-5 flex-row items-center justify-between">
            <Text className="text-3xl font-bold font-serif text-maroon">
              Your Plate
            </Text>
            <TouchableOpacity onPress={handleOpen}>
              <XMarkIcon size={20} color="#C70039" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {isScrollable ? (
            <ScrollView className="mx-5 mb-4">
              {Object.entries(groupedItems).map(([kname, items]) => (
                <View key={kname} className="mb-4">
                  <Text className="text-lg font-bold text-maroon">{kname}</Text>
                  <View className="p-1 mb-2 border-b-2 border-nonveg"></View>
                  {items.map((item, index) => (
                    <View key={index} className="flex-row justify-between">
                      <Text className="mx-2">
                        {item.name} x {item.quantity}
                      </Text>
                      <Text>Rs {item.quantity * 40}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          ) : (
            <View className="mx-5 mb-4 flex-1">
              {Object.entries(groupedItems).map(([kname, items]) => (
                <View key={kname} className="mb-4">
                  <Text className="text-lg font-bold text-maroon">{kname}</Text>
                  <View className="p-1 mb-2 border-b-2 border-nonveg"></View>
                  {items.map((item, index) => (
                    <View key={index} className="flex-row justify-between">
                      <Text className="mx-2">
                        {item.name} x {item.quantity}
                      </Text>
                      <Text>Rs {item.quantity * 40}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          <View className="flex-row justify-between border-t-2 border-nonveg items-center mt-2 mb-4">
            <Text className="text-lg mt-2 mx-2 font-bold text-green">
              Total Items:
            </Text>
            <Text className="mx-6">{cartStore.totalItems}</Text>
          </View>

          <View className="p-4 bg-secondary rounded-lg shadow-lg shadow-black flex-row justify-between mx-10 mb-4">
            <TouchableOpacity
              onPress={() => {
                cartStore.addOrder();
                handleOpen();
              }}
            >
              <View className="flex-row justify-between w-full">
                <Text className="text-lg font-bold">Proceed to Pay</Text>
                <Text className="text-lg font-bold">
                  Rs{" "}
                  {cartStore.cart.reduce(
                    (total, item) => total + item.quantity * 40,
                    0
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
});

export default Basket;