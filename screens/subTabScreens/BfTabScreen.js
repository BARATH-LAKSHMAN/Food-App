import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Ensure Firebase is properly initialized
import "../../global.css";
import Basket from '../../components/Basket';

const BfTabScreen = () => {
  const [breakfastDishes, setBreakfastDishes] = useState([]);
  const navigation = useNavigation();
  const [isBreakfastTime, setIsBreakfastTime] = useState(false);

  const images = {
    chapathi: require('../../assets/foodDisplay/chapathi.jpg'),
    curdrice: require('../../assets/foodDisplay/curdrice.jpg'),
    dosa: require('../../assets/foodDisplay/dosa.jpg'),
    idly: require('../../assets/foodDisplay/idly.jpg'),
    parotta: require('../../assets/foodDisplay/parota.webp'),
    pongal: require('../../assets/foodDisplay/pongal.jpg'),
    poori: require('../../assets/foodDisplay/poori.jpg'),
    sambarrice: require('../../assets/foodDisplay/sambarrice.jpg')
  };

  useEffect(() => {
    // Check if the current time is between 6 AM and 12 PM
    const currentHour = new Date().getHours();
    setIsBreakfastTime(currentHour >= 6 && currentHour < 12);

    if (currentHour >= 6 && currentHour < 12) {
      const fetchDishes = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'dishes'));
          const fetchedDishes = querySnapshot.docs
            .map(doc => doc.data())
            .filter(dish => dish.categories.includes("Breakfast")) // Filter for Breakfast dishes
            .map(dish => ({
              ...dish,
              imageKey: dish.imageUrl // imageUrl is already formatted as lowercase without spaces
            }));
          
          setBreakfastDishes(fetchedDishes);
        } catch (error) {
          console.error("Error fetching dishes:", error);
        }
      };

      fetchDishes();
    }
  }, []);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-primary flex-1">
        {isBreakfastTime ? (
          <View className="flex-row justify-evenly mb-5 flex-wrap">
            {breakfastDishes.map((dish, index) => (
              <View key={index} className="w-36 h-36 mt-6 bg-veg rounded-xl shadow-lg shadow-maroon overflow-hidden">
                <TouchableOpacity onPress={() => navigation.navigate("KitchenFood", { name: dish.name, category: "Breakfast"})}>
                  <Image source={images[dish.imageKey]} className="h-36 w-36 relative z-0" />
                  <View className="absolute bottom-0 bg-white w-full p-1 z-40">
                    <Text className="text-xl font-semibold text-center">{dish.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View className="flex-1 justify-center items-center mt-5">
            <Text className="text-black text-xl font-bold">Breakfast items unavailable now</Text>
          </View>
        )}
      </ScrollView>
      <Basket />
    </>
  );
};

export default BfTabScreen;