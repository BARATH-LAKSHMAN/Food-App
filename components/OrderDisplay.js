import { View, Text } from 'react-native'
import React from 'react'

const OrderDisplay = () => {
  return (
    <View className="mt-2 p-6 rounded-xl shadow-lg">
        <View className="flex-row justify-between mt-2 mb-4">
      <Text className="font-semibold">Order No: 1234</Text>
      <Text className="font-semibold">Date: 03/06/2024</Text>
      </View>
      <View>
      <View className="flex-row justify-evenly">
        <Text>Product Name</Text>
        <Text>110 Rs</Text>
        <Text>x1</Text>
       </View>
       <View className="flex-row justify-evenly">
        <Text>Product Name</Text>
        <Text>210 Rs</Text>
        <Text>x2</Text>
       </View>
       <View className="flex-row justify-evenly">
        <Text>Product Name</Text>
        <Text>70 Rs</Text>
        <Text>x3</Text>
       </View>
       </View>
       <View className="flex-row justify-between mt-4 mb-2"><Text className="font-semibold">Quantity: 6</Text><Text className="font-semibold">Total Price: 640 Rs</Text></View>
       <Text className="text-center text-lg">Status...</Text>
    </View>
  )
}

export default OrderDisplay