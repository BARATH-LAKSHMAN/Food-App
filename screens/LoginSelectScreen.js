import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const LoginSelectScreen = () => {
  const Navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="items-center justify-center bg-veg flex-1"
    >
      <TouchableOpacity onPress={() => Navigation.navigate("LandingScreen")}>
        <Text className="bg-primary w-60 p-2 rounded-lg text-center mb-10 text-lg">
          Want to eat
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Navigation.navigate("ChefRegister")}>
        <Text className="bg-primary w-60 p-2 rounded-lg text-center text-lg">
          Become a chef
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginSelectScreen;
