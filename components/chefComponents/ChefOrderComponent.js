import { View, Text } from 'react-native'
import React from 'react'

const ChefOrderComponent = () => {
  return (
    <View className="bg-gray  rounded-lg px-4 py-2 border border-orange mb-1">
        <View className="border-b border-orange pb-2 border-dashed">
          <Text className="text-lg font-semibold text-orange text-center">
            Order Id: 12334
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
            Deliver by: <Text className="text-yellow">12/07/2024</Text>
          </Text>
          <Text>
            Earnings: <Text className="text-yellow">100</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ChefOrderComponent