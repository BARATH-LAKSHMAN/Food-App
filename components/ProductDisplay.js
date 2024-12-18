import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ProductDisplay = (props) => {
  return (
    <View className="mt-2 mx-4 flex-row items-center justify-between border-b-2 border-b-veg pb-3">
      <Image source={props.img}
        className="w-20 h-20 rounded mt-1" />
         <View className="">
        <Text className="text-xl font-bold">{props.name}</Text>
        <Text className="text-center">110 Rs</Text>
       </View>
        <View className="flex-row">
        <TouchableOpacity>
          <Text className="bg-secondary rounded-full h-8 w-8 text-center text-lg font-bold">
            -
          </Text>
        </TouchableOpacity>
        <Text className="text-xl mx-2 text-center">1</Text>
        <TouchableOpacity>
          <Text className="bg-secondary rounded-full h-8 w-8 text-center text-lg font-bold">
            +
          </Text>
        </TouchableOpacity></View>
    </View>
  )
}

export default ProductDisplay