import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  MinusIcon,
  PlusIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import ProfileSubComponents from "../../components/chefComponents/ProfileSubComponents";
import ChefProfileWeekSchedule from "../../components/chefComponents/ChefProfileWeekSchedule";
import FABNav from "../../components/chefComponents/FABNav";

const ChefProfileScreen = () => {
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
      <View className="m-5 flex-row justify-between border-b border-gray">
        <View className="flex-1 p-2">
          <Text>
            ChedID: <Text className="text-yellow">1234</Text>
          </Text>
          <Text className="text-xl">
            Name: <Text className="text-yellow">ABCD</Text>
          </Text>
        </View>
        <View className="items-center p-2 border-l border-l-gray pl-10">
          <Text>
            Orders: <Text className="text-yellow">1234</Text>
          </Text>
          <Text className="flex-row justify-center">
            Rating: {""}
            <Text className="text-yellow ">
              4.5
              <StarIcon name="star" color="orange" size={12} />
            </Text>
          </Text>
        </View>
      </View>

      <ProfileSubComponents
        title="Kitchen Name:"
        desc="WOW Kitchen"
        button=" Edit"
      />
      <ProfileSubComponents
        title="Address:"
        desc="Plot 4a, Nagar, Street, Porur, Chennai 600128"
        button=" Edit"
      />
      <ProfileSubComponents
        title="Menu:"
        desc="All the available dishes in your kitchen"
        button="View"
      />
      <ProfileSubComponents
        title="Subscribers:"
        desc="View all your subscribers  "
        button="View"
      />
      <View className="m-4">
        <View className="flex-row justify-between items-center bg-gray p-4">
          <TouchableOpacity>
            <Text className="text-orange bg-yellow p-1 px-2 rounded-xl">
              Add <PlusIcon color="#FF7400" size={12} />
            </Text>
          </TouchableOpacity>
          <Text className="text-center">This Weeks Schedule</Text>
          <TouchableOpacity>
            <Text className="text-orange bg-yellow p-1 px-2 rounded-xl">
              Delete <MinusIcon color="#FF7400" size={12} />
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          className="h-[25%] my-1"
          showsVerticalScrollIndicator={false}
        >
          <ChefProfileWeekSchedule />
          <ChefProfileWeekSchedule />
          <ChefProfileWeekSchedule />
          <ChefProfileWeekSchedule />
          <ChefProfileWeekSchedule />
          <ChefProfileWeekSchedule />
          <ChefProfileWeekSchedule />
        </ScrollView>
      </View>
      <ProfileSubComponents
        title="Income:"
        desc="123456 Rs"
        button="View"
      />
      <ProfileSubComponents
        title="Products:"
        desc="5"
        button="View"
      />
      <FABNav />
    </View>
  );
};

export default ChefProfileScreen;
