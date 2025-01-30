import { View, Text, ScrollView } from "react-native";
import React from "react";
import "../global.css";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OrderDisplay from "../components/OrderDisplay";
import { observer } from "mobx-react-lite";
import cartStore from "../stores/CartStore";

const OrdersTabScreen = observer(() => {
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
        <View className="m-5">
          <Text className="text-3xl font-bold font-serif text-maroon">
            Previous Orders
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-primary flex-1 mb-4">
        <OrderDisplay />
        <OrderDisplay />
        <OrderDisplay />

        {cartStore.orders.map((order) => (
          <OrderDisplay key={order.orderId} order={order} />
        ))}
      </ScrollView>
    </View>
  );
});

export default OrdersTabScreen;
