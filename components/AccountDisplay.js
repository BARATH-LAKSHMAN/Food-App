import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { UserIcon } from "react-native-heroicons/solid";

const AccountDisplay = () => {
  return (
    <TouchableOpacity className="">
      <View className="p-3 mx-4 border-b-2 border-veg flex-row">
        <UserIcon size={20} color="gray" />
        <Text className="font-semibold ml-5 text-gray">AccountDisplay</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AccountDisplay;
