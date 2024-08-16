import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { PencilIcon } from 'react-native-heroicons/solid';

const ProfileSubComponents = (props) => {
  return (
    <View className="mx-4 flex-row justify-between bg-gray p-2 border-b border-white">
      <View className="flex-row">
        <Text className="text-lg p-1">{props.title}</Text>
        <ScrollView horizontal className="w-[65%]">
          <Text className="text-yellow p-1 text-lg pr-16">{props.desc}</Text>
        </ScrollView>
      </View>
      <View className="absolute right-2 top-2">
        <TouchableOpacity >
          <Text className="text-lg text-orange bg-yellow p-1 px-2 rounded-xl">
            {props.button} <PencilIcon color="#FF7400" size={12} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProfileSubComponents