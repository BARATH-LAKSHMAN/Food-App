import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import KitchenFoodDisplay from '../components/KitchenFoodDisplay';
import Basket from '../components/Basket';

const KitchenFoodScreen = ({route}) => {
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
       <KitchenFoodDisplay
         name={route.params.data.name}
         img={route.params.data.img}
         kname = "A's kitchen"
       />
       <KitchenFoodDisplay
         name={route.params.data.name}
         img={route.params.data.img}
         kname = "B's kitchen"
       />
       <KitchenFoodDisplay
         name={route.params.data.name}
         img={route.params.data.img}
         kname = "C's kitchen"
       />
       <KitchenFoodDisplay
         name={route.params.data.name}
         img={route.params.data.img}
         kname = "D's kitchen"
       />
       <KitchenFoodDisplay
         name={route.params.data.name}
         img={route.params.data.img}
         kname = "E's kitchen"
       />
     </ScrollView>
     <Basket />
   </View>
 );
}

export default KitchenFoodScreen