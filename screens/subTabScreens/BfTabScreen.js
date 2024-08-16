import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import FoodDisplay from '../../components/FoodDisplay'
import "../../global.css"
import Basket from '../../components/Basket'

const BfTabScreen = () => {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-primary flex-1"
      >
        <View className="flex-row justify-evenly mb-5 flex-wrap">
          <FoodDisplay />
          <FoodDisplay />
          <FoodDisplay />
          <FoodDisplay />
          <FoodDisplay />
          <FoodDisplay />
          <FoodDisplay />
          <FoodDisplay />
        </View>
      </ScrollView>
      <Basket />
    </>
  );
}

export default BfTabScreen