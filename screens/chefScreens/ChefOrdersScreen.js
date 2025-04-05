import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { db, auth } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import FABNav from "../../components/chefComponents/FABNav";

const ChefOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userUID = auth.currentUser?.uid;
        if (!userUID) return;

        // Get the kitchen associated with the logged-in user
        const kitchensRef = collection(db, "kitchens");
        const kitchenQuery = query(kitchensRef, where("userId", "==", userUID));
        const kitchenSnapshot = await getDocs(kitchenQuery);
        if (kitchenSnapshot.empty) return;

        const kitchenDoc = kitchenSnapshot.docs[0];
        const kitchenId = kitchenDoc.id;

        // Get orders where status is "Accepted"
        const ordersRef = collection(db, "kitchens", kitchenId, "orders");
        const ordersQuery = query(ordersRef, where("status", "==", "Accepted"));
        const ordersSnapshot = await getDocs(ordersQuery);

        const ordersList = ordersSnapshot.docs.map(doc => ({
          orderId: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching accepted orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }} className="bg-white flex-1">
      <View className="flex-row justify-between mx-4 mt-4 px-5 border-b border-gray">
        <View className="p-4 pr-16 justify-center items-center border-r border-gray">
          <Text className="text-3xl">Orders</Text>
          <Text className="text-lg text-yellow font-semibold">Taken</Text>
        </View>

        <View className="p-4 justify-center">
          <Text>
            Count: <Text className="text-orange font-semibold">{orders.length}</Text>
          </Text>
          <Text>
            Earnings: <Text className="text-orange font-semibold">
              ₹ {orders.reduce((total, order) => total + order.totalPrice, 0)}
            </Text>
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="mx-4 my-1">
        {orders.map(order => (
          <View key={order.orderId} className="bg-gray rounded-lg px-4 py-2 border border-orange mb-1">
            <View className="border-b border-orange pb-2 border-dashed">
              <Text className="text-lg font-semibold text-orange text-center">
                Order ID: {order.orderId}
              </Text>
            </View>

            <View className="py-4 flex-row justify-between">
              <View>
                <Text>
                  Order by: <Text className="text-yellow font-semibold">{order.orderBy || "Customer"}</Text>
                </Text>
                <Text>
                  Meal: <Text className="text-yellow font-semibold">{order.category.charAt(0).toUpperCase() + order.category.slice(1)}</Text>
                </Text>
                <View className="flex-row">
                  <Text className="mr-2">Menu:</Text>
                  <View className="flex-column">
                    {order.items.map(item => (
                      <Text key={item.dishName} className="text-yellow font-bold">
                        {item.dishName} x{item.quantity}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
              <View>
                <Text>
                  <Text>Number of Items: <Text className="text-yellow font-semibold">{order.totalQuantity}</Text></Text>
                </Text>
                <Text>
                  Earnings: <Text className="text-yellow font-semibold">₹ {order.totalPrice}</Text>
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <FABNav />
    </View>
  );
};

export default ChefOrdersScreen;