import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const RemindersComponent = (props) => {
  return (
    <View className="bg-gray  rounded-lg px-4 py-2 border border-orange mb-1">
      <View className="border-b border-orange pb-2 border-dashed">
        <Text className="text-lg font-semibold text-orange text-center">
          {props.type} Id: 12334
        </Text>
      </View>

      <View className="py-4 flex-row justify-between">
        <View>
          <Text>
            Order by: <Text className="text-yellow">Mr. Barath</Text>
          </Text>
          <Text>
            Meal: <Text className="text-yellow">Breakfast</Text>
          </Text>
          <View className="flex-row">
            <Text className="mr-2">Menu:</Text>
            <View>
              <Text className="text-yellow">Idly x2</Text>
              <Text className="text-yellow">Dosa x2</Text>
            </View>
          </View>
        </View>
        <View>
          <Text>
            Type: <Text className="text-yellow">{props.type}</Text>
          </Text>
          <Text>
            Earnings: <Text className="text-yellow">100</Text>
          </Text>
          {props.type == "Subscription" ? (
            <></>
          ) : (
            <TouchableOpacity>
              <View className="bg-maroon p-2 rounded-xl mt-2">
                <Text className="text-center text-yellow">Cancel</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default RemindersComponent;
