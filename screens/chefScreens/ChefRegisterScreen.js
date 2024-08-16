import { View, Text, TextInput, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Checkbox } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChefRegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const [checked, setChecked] = React.useState(false);
  const Navigation = useNavigation()
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="bg-white flex-1 items-center"
    >
      <View className="border border-yellow p-10 rounded-xl m-4 mt-20">
        <Text className="font-bold text-3xl text-orange absolute -top-6 left-10 bg-white">
          Register
        </Text>
        <Text className="text-xl mb-4">
          Make your
          <Text className="font-semibold text-yellow">Cloud Kitchen!</Text>
        </Text>
        <ScrollView
          className="flex-grow-0"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text className="text-lg ml-2">Phone Number</Text>
            <TextInput
              placeholder="Enter your phone number"
              className="border border-orange p-2 rounded-lg"
            />
          </View>
          <View className="mt-4">
            <Text className="text-lg ml-2">Name</Text>
            <TextInput
              placeholder="Enter your name"
              className="border border-orange p-2 rounded-lg"
            />
          </View>
          <View className="mt-4">
            <Text className="text-lg ml-2">Kitchen Name</Text>
            <TextInput
              placeholder="Enter your kitchen name"
              className="border border-orange p-2 rounded-lg"
            />
          </View>
          <View className="mt-4">
            <Text className="text-lg ml-2">Address</Text>
            <TextInput
              placeholder="Enter your address"
              className="border border-orange p-2 rounded-lg"
            />
          </View>
          <View className="flex-row items-center mt-4">
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
              color="orange"
              uncheckedColor="#FF7400"
              className="-ml-2"
            />
            <Text className="text-yellow">
              I agree to the terms and conditions.
            </Text>
          </View>
          <TouchableOpacity
            disabled={!checked}
            onPress={() => Navigation.navigate("ChefLandingScreen")}
          >
            <Text
              className={
                checked
                  ? "bg-yellow p-4 border border-orange rounded-xl text-center text-white"
                  : "border-yellow bg-gray border p-4 rounded-xl text-[gray] text-center"
              }
            >
              Register
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Text className="mt-2 font-semibold text-lg">
        Already have a Kitchen?{" "}
        <Text className="text-orange underline">Login</Text>
      </Text>
    </View>
  );
};

export default ChefRegisterScreen;
