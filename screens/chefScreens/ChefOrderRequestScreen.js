import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { observer } from "mobx-react-lite";
import cartStore from "../../stores/CartStore";
import FABNav from '../../components/chefComponents/FABNav';
import RequestComponent from '../../components/chefComponents/RequestComponent';

const ChefOrderRequestScreen = observer(() => {
  const orders = cartStore.pendingOrders.filter(order =>
    order.items.some(item => item.kname === "A's kitchen")
  );
  const insets = useSafeAreaInsets();
  const Navigation = useNavigation();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="bg-white flex-1"
    >
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
            Possible Earnings:{" "}
            <Text className="text-orange font-semibold">
              {orders.reduce((total, order) =>
                total + order.items
                  .filter(item => item.kname === "A's kitchen")
                  .reduce((sum, item) => sum + 40 * item.quantity, 0)
                , 0)}
            </Text>
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="mx-4 my-1">
        {orders.map((order) => (
          <RequestComponent key={order.orderId} order={order} />
        ))}
      </ScrollView>
      <FABNav />
    </View>
  );
});

export default ChefOrderRequestScreen