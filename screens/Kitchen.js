import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import KitchenDisplay from "../components/KitchenDisplay";
import SearchBar from "../components/SearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Basket from "../components/Basket";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Kitchen = () => {
  const insets = useSafeAreaInsets();
  const [kitchens, setKitchens] = useState([]);

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "kitchens"));
        const kitchenList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setKitchens(kitchenList);
      } catch (error) {
        console.error("Error fetching kitchens: ", error);
      }
    };

    fetchKitchens();
  }, []);

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
        {kitchens.map((kitchen) => (
          <KitchenDisplay name={kitchen.kitchenName} />
        ))}
      </ScrollView>
      <Basket />
    </View>
  );
};

export default Kitchen;