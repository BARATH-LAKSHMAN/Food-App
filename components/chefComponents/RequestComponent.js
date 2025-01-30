import { View, Text, Alert } from 'react-native'
import React from 'react'
import { CheckIcon,XMarkIcon } from 'react-native-heroicons/solid';
import { TouchableOpacity } from 'react-native';
import cartStore from '../../stores/CartStore';

const RequestComponent = ({ order }) => {

  const filteredItems = order.items.filter(item => item.kname === "A's kitchen");

  const handleAccept = () => {
    cartStore.acceptOrder(order.orderId);
    Alert.alert('Order Accepted!');
  };

  const handleDecline = () => {
    cartStore.declineOrder(order.orderId);
    Alert.alert('Order Declined');
  };

  return (
    <View className="bg-yellow  rounded-lg px-4 py-2 border border-orange mb-1">
      <View className="border-b border-orange w-full pb-2 flex-row justify-between items-center">
        <TouchableOpacity onPress={handleDecline}>
          <View className="bg-maroon p-1 rounded-full">
            <XMarkIcon size={20} color="#FF7400" />
          </View>
        </TouchableOpacity>
        <View>
          <Text className="text-lg font-semibold text-primary text-center">
            Order Id: {order.orderId}
          </Text>
        </View>
        <TouchableOpacity onPress={handleAccept}>
          <View className="bg-green p-1 rounded-full">
            <CheckIcon size={20} color="#FF7400"/>
          </View>
        </TouchableOpacity>
      </View>
      <View className="py-4 flex-row justify-between">
        <View>
          <Text>
            Order by: <Text className="text-white">Mr. Barath</Text>
          </Text>
          <Text>
            Meal: <Text className="text-white">Breakfast</Text>
          </Text>
          <View className="flex-row">
            <Text className="mr-2">Menu:</Text>
            <View className="flex-column">
              {filteredItems.map((item) => (
                <Text key={item.name} className="text-white">
                  {item.name} x{item.quantity}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View>
        <Text>
            Number of Items: <Text className="text-white">{filteredItems.reduce((total, item) => total + item.quantity, 0)}</Text>
          </Text>
          <Text>
            Deliver by: <Text className="text-white">{order.date}</Text>
          </Text>
          <Text>
            Earnings: <Text className="text-white">Rs {filteredItems.reduce((total, item) => total + 40 * item.quantity, 0)}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

export default RequestComponent