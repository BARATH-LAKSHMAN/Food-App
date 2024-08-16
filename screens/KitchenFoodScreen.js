import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import KitchenFoodDisplay from '../components/KitchenFoodDisplay';
import Basket from '../components/Basket';

const KitchenFoodScreen = () => {
 const insets = useSafeAreaInsets();
 return (
   <View className="flex-1 bg-primary">
     <View
       className="bg-secondary"
       style={{
         paddingTop: insets.top,
         paddingBottom: insets.bottom,
       }}
     >
       <View className="mx-4 mb-5">
         <SearchBar placeholder="Search restaurant..." />
       </View>
     </View>
     <ScrollView showsVerticalScrollIndicator={false}>
       <KitchenFoodDisplay />
       <KitchenFoodDisplay />
       <KitchenFoodDisplay />
       <KitchenFoodDisplay />
       <KitchenFoodDisplay />
       <KitchenFoodDisplay />
     </ScrollView>
     <Basket />
   </View>
 );
}

export default KitchenFoodScreen