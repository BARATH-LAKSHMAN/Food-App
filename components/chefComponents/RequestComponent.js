import { View, Text } from 'react-native'
import React from 'react'
import { CheckIcon,XMarkIcon } from 'react-native-heroicons/solid';
import { TouchableOpacity } from 'react-native';

const RequestComponent = () => {
  return (
    <View className="bg-yellow  rounded-lg px-4 py-2 border border-orange mb-1">
      <View className="border-b border-orange w-full pb-2 flex-row justify-between items-center">
        <TouchableOpacity>
          <View className="bg-maroon p-1 rounded-full">
            <XMarkIcon size={20} color="#FF7400" />
          </View>
        </TouchableOpacity>
        <View>
          <Text className="text-lg font-semibold text-primary text-center">
            Order Id: 12334
          </Text>
        </View>
        <TouchableOpacity>
          <View className="bg-green p-1 rounded-full">
            <CheckIcon size={20} color="#FF7400"/>
          </View>
        </TouchableOpacity>
      </View>
      <View className="py-4 flex-row justify-between">
        <View>
          <Text>
            Order by: <Text className="text-white">Mr. Barath</Text>
          </Text>
          <Text>
            Meal: <Text className="text-white">Breakfast</Text>
          </Text>
          <View className="flex-row">
            <Text className="mr-2">Menu:</Text>
            <View>
              <Text className="text-white">Idly x2</Text>
              <Text className="text-white">Dosa x2</Text>
            </View>
          </View>
        </View>
        <View>
          <Text>
            Deliver by: <Text className="text-white">12/07/2024</Text>
          </Text>
          <Text>
            Earnings: <Text className="text-white">100</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

export default RequestComponent