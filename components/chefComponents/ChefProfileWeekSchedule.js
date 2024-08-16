import { View, Text } from 'react-native'
import React from 'react'

const ChefProfileWeekSchedule = () => {
  return (
    <View className="bg-yellow  rounded-lg p-4 flex-row justify-between items-center border border-orange mb-1">
      <View>
        <Text className="text-lg font-semibold text-primary text-center pr-3">
          Monday
        </Text>
      </View>
      <View className="mr-4 border-l pl-4 border-dashed border-orange">
        <View className="py-1 border-b border-dashed border-orange">
          <View className="flex-row items-center">
            <Text>Dinner</Text>
            <View className="ml-3 border-x px-3 border-orange border-dashed">
              <Text>Idly x3</Text>
              <Text>Fish Curry x1</Text>
            </View>
            <Text className="pl-2">
              Qty: <Text className="text-white">5</Text>
            </Text>
          </View>
        </View>
        <View className="py-1 border-b border-dashed border-orange">
          <View className="flex-row items-center">
            <Text>Dinner</Text>
            <View className="ml-3 border-x px-3 border-orange border-dashed">
              <Text>Idly x3</Text>
              <Text>Fish Curry x1</Text>
            </View>
            <Text className="pl-2">
              Qty: <Text className="text-white">5</Text>
            </Text>
          </View>
        </View>
        <View className="py-1">
          <View className="flex-row items-center">
            <Text>Dinner</Text>
            <View className="ml-3 border-x px-3 border-orange border-dashed">
              <Text>Idly x3</Text>
              <Text>Fish Curry x1</Text>
            </View>
            <Text className="pl-2">
              Qty: <Text className="text-white">5</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ChefProfileWeekSchedule