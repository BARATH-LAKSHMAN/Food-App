import { View, Text } from 'react-native'
import React from 'react'

const ChefOrderComponent = ({ order }) => {
  const filteredItems = order.items.filter(item => item.kname === "A's kitchen");

  return (
    <View className="bg-gray  rounded-lg px-4 py-2 border border-orange mb-1">
      <View className="border-b border-orange pb-2 border-dashed">
        <Text className="text-lg font-semibold text-orange text-center">
          Order Id: {order.orderId}
        </Text>
      </View>

      <View className="py-4 flex-row justify-between">
        <View>
          <Text>
            Order by: <Text className="text-yellow">{order.orderId}</Text>
          </Text>
          <Text>
            Meal: <Text className="text-yellow">Breakfast</Text>
          </Text>
          <View className="flex-row">
            <Text className="mr-2">Menu:</Text>
            <View className="flex-column">
              {filteredItems.map((item) => (
                <Text key={item.name} className="text-yellow font-bold">
                  {item.name} x{item.quantity}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View>
          <Text>
            Deliver by: <Text className="text-yellow">{order.date}</Text>
          </Text>
          <Text>
            Earnings: <Text className="text-yellow">Rs {filteredItems.reduce((total, item) => total + 40 * item.quantity, 0)}</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ChefOrderComponent