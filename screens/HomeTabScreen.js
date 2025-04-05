import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MapPinIcon } from "react-native-heroicons/solid";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import OrderNowTabScreen from "./OrderNowTabScreen";
import PrebookTabScreen from "./PrebookTabScreen";

const Tab = createMaterialTopTabNavigator();

const HomeTabScreen = () => {
  const insets = useSafeAreaInsets();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userId", "==", user.uid));

      getDocs(q).then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userDocRef = doc(db, "users", userDoc.id);

          const unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              setUserData(doc.data());
            }
          });
          setLoading(false);
          return unsubscribe;
        }
      }).catch(error => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF7400" style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <View className={`flex-1 bg-primary`}>
      <View
        className="bg-secondary"
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View className="mx-5 mt-5 flex-row">
          <Text className="text-3xl font-bold font-serif text-maroon flex-1">
            Hey {userData ? userData.name : "User"}!
          </Text>
          <View className="flex-row justify-center items-center">
            <MapPinIcon size={30} color="#C70039" />
            <Text className="text-xl font-semibold">{userData ? userData.address : "Unknown"}</Text>
          </View>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#EDEDED" },
          tabBarActiveTintColor: "#FF7400",
          tabBarInactiveTintColor: "gray",
          tabBarIndicatorStyle: { backgroundColor: "#FF7400" },
          tabBarPressColor: "#C70039",
          tabBarLabelStyle: { fontWeight: 900 },
        }}
      >
        <Tab.Screen name="Order Now" component={OrderNowTabScreen} />
        <Tab.Screen name="Prebook" component={PrebookTabScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default HomeTabScreen;