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
          <FoodDisplay
            name="Idly"
            img={require("../../assets/foodDisplay/idly.jpg")}
          />
          <FoodDisplay
            name="Dosa"
            img={require("../../assets/foodDisplay/dosa.jpg")}
          />
          <FoodDisplay
            name="Pongal"
            img={require("../../assets/foodDisplay/pongal.jpg")}
          />
          <FoodDisplay
            name="Chapathi"
            img={require("../../assets/foodDisplay/chapathi.jpg")}
          />
          <FoodDisplay
            name="Parota"
            img={require("../../assets/foodDisplay/parota.webp")}
          />
          <FoodDisplay
            name="Poori"
            img={require("../../assets/foodDisplay/poori.jpg")}
          />
        </View>
      </ScrollView>
      <Basket />
    </>
  );
}

export default BfTabScreen