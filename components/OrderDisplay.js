import { View, Text, ScrollView } from 'react-native';
import React from 'react';

const OrderDisplay = ({ order }) => {
  if (!order) return null;

  const groupedItems = order.items.reduce((groups, item) => {
    if (!groups[item.kname]) groups[item.kname] = [];
    groups[item.kname].push(item);
    return groups;
  }, {});

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
      <View className="mb-4 p-6 rounded-xl shadow-lg">
        <View className="flex-row justify-between mt-2 mb-4">
          <Text className="font-semibold">Order No: {order.orderId}</Text>
          <Text className="font-semibold">Date: {order.date}</Text>
        </View>
        <View>
          {Object.keys(groupedItems).map((kname, index) => (
            <View key={index} className="mb-4">
              <Text className="text-maroon font-bold text-lg mb-2">{kname}</Text>
              {groupedItems[kname].map((item, idx) => (
                <View key={idx} className="flex-row justify-evenly">
                  <Text>{item.name} x{item.quantity}</Text>
                  <Text>Rs {40 * item.quantity}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View className="flex-row justify-between mt-4 mb-2">
          <Text className="text-orange font-semibold">Quantity: {order.totalQuantity}</Text>
          <Text className="text-green font-semibold">
            Total Price: {order.totalPrice} Rs
          </Text>
        </View>
        <Text className={`
          text-center text-lg font-bold ${order.status === "Accepted"
            ? "text-green"
            : order.status === "Declined"
              ? "text-maroon"
              : "text-yellow"
          }`}>{order.status}</Text>
      </View>
    </ScrollView>
  );
};

export default OrderDisplay;