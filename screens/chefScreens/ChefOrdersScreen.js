import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FABNav from "../../components/chefComponents/FABNav";
import ChefOrderComponent from "../../components/chefComponents/ChefOrderComponent";

const ChefOrdersScreen = () => {
  const insets = useSafeAreaInsets();
  const Navigation = useNavigation();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="bg-white flex-1"
    >
      <View className="flex-row justify-between mx-4 mt-4 px-5 border-b border-gray">
        <View className="p-4 pr-16 justify-center items-center border-r border-gray">
          <Text className="text-3xl">Orders</Text>
          <Text className="text-lg text-yellow font-semibold">Taken</Text>
        </View>

        <View className="p-4 justify-center">
          <Text>
            Count: <Text className="text-orange font-semibold">40</Text>
          </Text>
          <Text>
            Earnings: <Text className="text-orange font-semibold">35000</Text>
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="mx-4 my-1">
        <ChefOrderComponent />
        <ChefOrderComponent />
        <ChefOrderComponent />
        <ChefOrderComponent />
        <ChefOrderComponent />
        <ChefOrderComponent />
        <ChefOrderComponent />
      </ScrollView>
      <FABNav />
    </View>
  );
};

export default ChefOrdersScreen;
