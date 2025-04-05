import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CheckIcon, XMarkIcon } from 'react-native-heroicons/solid';
import { db, auth } from '../../firebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';
import FABNav from '../../components/chefComponents/FABNav';

const ChefOrderRequestScreen = () => {
  const [orders, setOrders] = useState([]);
  const insets = useSafeAreaInsets();
  const Navigation = useNavigation();

  useEffect(() => {
    let unsubscribe = null;

    const fetchOrders = async () => {
      try {
        const userUID = auth.currentUser?.uid;
        if (!userUID) return;

        const kitchensRef = collection(db, "kitchens");
        const kitchenQuery = query(kitchensRef, where("userId", "==", userUID));
        const kitchenSnapshot = await getDocs(kitchenQuery);
        if (kitchenSnapshot.empty) return;

        const kitchenDoc = kitchenSnapshot.docs[0];
        const kitchenId = kitchenDoc.id;

        // Set up Firestore real-time listener
        const ordersRef = collection(db, "kitchens", kitchenId, "orders");
        const ordersQuery = query(ordersRef, where("status", "==", "Yet to Accept"));

        unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
          const ordersList = snapshot.docs.map((doc) => ({
            orderId: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersList);
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

    // Cleanup listener on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }} className="bg-white flex-1">
      <View className="flex-row justify-between mx-4 mt-4 px-5 border-b border-gray">
        <View className="p-4 pr-16 justify-center border-r border-gray">
          <Text className="text-3xl">Order</Text>
          <Text className="text-lg text-yellow font-semibold">Requests</Text>
        </View>
        <View className="p-4 justify-center">
          <Text>
            New Requests: <Text className="text-orange font-semibold">{orders.length}</Text>
          </Text>
          <Text>
            Possible Earnings: <Text className="text-orange font-semibold">₹ {orders.reduce((total, order) => total + order.totalPrice, 0)}</Text>
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="mx-4 my-1">
        {orders.map(order => (
          <RequestComponent key={order.orderId} order={order} />
        ))}
      </ScrollView>
      <FABNav />
    </View>
  );
};

const RequestComponent = ({ order }) => {
  const handleAccept = async () => {
    try {
      const userUID = auth.currentUser?.uid;
      if (!userUID) return;

      const kitchensRef = collection(db, 'kitchens');
      const kitchenQuery = query(kitchensRef, where('userId', '==', userUID));
      const kitchenSnapshot = await getDocs(kitchenQuery);
      if (kitchenSnapshot.empty) return;

      const kitchenDoc = kitchenSnapshot.docs[0];
      const kitchenId = kitchenDoc.id;

      // Update order status in the kitchen's order subcollection
      const kitchenOrderRef = doc(db, 'kitchens', kitchenId, 'orders', order.orderId);
      await updateDoc(kitchenOrderRef, { status: 'Accepted' });

      // Update order status in the user's order subcollection under the specific kitchen
      const userOrderRef = doc(db, 'users', order.userNumber, 'orders', order.orderId);
      await updateDoc(userOrderRef, {
        [`${kitchenId}.status`]: 'Accepted' // Updates only the status for the respective kitchen
      });

      const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });

      // Reference to the weeklySchedule document for the current day
      const scheduleRef = doc(db, 'kitchens', kitchenId, 'weeklySchedule', currentDay);
      const scheduleSnapshot = await getDoc(scheduleRef); // FIXED: Using getDoc instead of getDocs

      if (!scheduleSnapshot.exists()) return;

      const scheduleData = scheduleSnapshot.data();
      const category = order.category.toLowerCase(); // Ensure case consistency

      if (scheduleData[category]) {
        const updatedCategory = scheduleData[category].map((dish) => {
          const orderedDish = order.items.find((item) => item.dishName === dish.dishName);
          if (orderedDish) {
            const currentQuantity = parseInt(dish.quantity, 10); // Convert from string to number
            const orderQuantity = orderedDish.quantity; // Assuming this is already a number

            return {
              ...dish,
              quantity: Math.max(0, currentQuantity - orderQuantity).toString(), // Convert back to string
              sold: dish.sold + orderQuantity,
            };
          }
          return dish;
        });

        // Update the Firestore document
        await updateDoc(scheduleRef, { [category]: updatedCategory });
      }

      Alert.alert('Order Accepted');
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleDecline = () => Alert.alert('Order Declined');

  return (
    <View className="bg-yellow rounded-lg px-4 py-2 border border-orange mb-1 mt-1">
      <View className="border-b border-orange w-full pb-2 flex-row justify-between items-center">
        <TouchableOpacity onPress={handleDecline}>
          <View className="bg-maroon p-1 rounded-full">
            <XMarkIcon size={20} color="#FF7400" />
          </View>
        </TouchableOpacity>
        <View>
          <Text className="text-lg font-semibold text-primary text-center">Order ID: {order.orderId}</Text>
        </View>
        <TouchableOpacity onPress={handleAccept}>
          <View className="bg-green p-1 rounded-full">
            <CheckIcon size={20} color="#FF7400" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="py-4 flex-row justify-between">
        <View>
          <Text>Order by: <Text className="text-white font-semibold">{order.orderBy}</Text></Text>
          <Text>Meal: <Text className="text-white font-semibold">{order.category.charAt(0).toUpperCase() + order.category.slice(1)}</Text></Text>
          <View className="flex-row">
            <Text className="mr-2">Dishes:</Text>
            <View className="flex-column">
              {order.items.map(item => (
                <Text key={item.dishName} className="text-white font-semibold">{item.dishName} x{item.quantity}</Text>
              ))}
            </View>
          </View>
        </View>
        <View>
          <Text>Number of Items: <Text className="text-white font-semibold">{order.totalQuantity}</Text></Text>
          <Text>Earnings: <Text className="text-white font-semibold">₹ {order.totalPrice}</Text></Text>
        </View>
      </View>
    </View>
  );
};

export default ChefOrderRequestScreen;