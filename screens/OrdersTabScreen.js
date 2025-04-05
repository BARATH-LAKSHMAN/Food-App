import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";

const OrdersTabScreen = () => {
  const insets = useSafeAreaInsets();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userUID = auth.currentUser?.uid;
    console.log("Authenticated User UID:", userUID);
    if (!userUID) return;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userId", "==", userUID));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      if (querySnapshot.empty) {
        console.error("User document not found");
        setOrders([]);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const ordersCollectionRef = collection(userDoc.ref, "orders");

      onSnapshot(ordersCollectionRef, (ordersSnapshot) => {
        const ordersData = ordersSnapshot.docs.map((doc) => {
          const data = doc.data();
          if (!data || typeof data !== "object") {
            console.warn("Unexpected data format:", data);
            return { id: doc.id };
          }
          console.log("Order Document Data:", data);
          return { id: doc.id, ...data };
        });
        console.log("Fetched Orders:", ordersData);
        setOrders(ordersData);
      });
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View className="flex-1 bg-primary">
      <View
        className="bg-secondary"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <View className="m-5">
          <Text className="text-3xl font-bold font-serif text-maroon">
            Previous Orders
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="bg-primary flex-1 mb-4">
        {orders.length > 0 ? (
          orders.map((order) => {
            const kitchens = Object.keys(order).filter((key) => !["id", "category", "totalPrice", "totalQuantity"].includes(key));

            return (
              <View key={order.id} className="mb-4 p-6 rounded-xl shadow-lg bg-white">
                <View className="flex-row justify-between mt-2 mb-4">
                  <Text className="font-semibold">Order No: {order.id}</Text>
                  <Text className="font-semibold">Total Quantity: {order.totalQuantity}</Text>
                </View>

                {kitchens.map((kitchen, index) => (
                  <View key={index} className="mb-4">
                    <Text className="text-maroon font-bold text-lg mb-2">{kitchen}</Text>
                    {Array.isArray(order[kitchen]?.items) ? (
                      order[kitchen].items.map((item, idx) => (
                        <View key={idx} className="flex-row justify-between">
                          <Text>{item.dishName} x{item.quantity}</Text>
                          <Text>Rs {item.price * item.quantity}</Text>
                        </View>
                      ))
                    ) : (
                      <Text className="text-gray-500">No items available</Text>
                    )}
                    <Text className="font-bold mt-2">
                      <Text className="text-black">Status: </Text>
                      <Text className=
                        {`${order[kitchen]?.status === "Accepted" ? "text-green" :
                          order[kitchen]?.status === "Yet to Accept" ? "text-yellow" :
                            order[kitchen]?.status === "Declined" ? "text-maroon" :
                              "text-gray"}`}>
                        {order[kitchen]?.status || "Unknown"}
                      </Text>
                    </Text>
                  </View>
                ))}
                <View className="mt-2">
                  <Text className="text-lg font-semibold">Total Price: Rs {order.totalPrice}</Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text className="text-center text-gray-500 mt-5">No orders found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default OrdersTabScreen;