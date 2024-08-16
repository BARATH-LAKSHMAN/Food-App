import { View, Text, TextInput } from 'react-native'
import React from 'react'
import {
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";

const SearchBar = (props) => {
  return (
    <View className="mx-4 flex-row mt-4 bg-primary rounded-xl p-3 shadow-lg shadow-maroon">
      <MagnifyingGlassIcon
        size={30}
        color="#C6EBC5"
        strokeWidth={1}
        stroke="#C6EBC5"
      />
      <TextInput
        placeholder={props.placeholder}
        className="ml-2 font-semibold text-lg flex-1"
        placeholderTextColor="#C6EBC5"
      />
    </View>
  );
}

export default SearchBar