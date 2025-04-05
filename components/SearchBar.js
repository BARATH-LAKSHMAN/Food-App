import { View, TextInput, Pressable, Modal, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon, ChevronUpIcon } from 'react-native-heroicons/solid';
import SearchFood from './SearchFood';
import SearchKitchen from './SearchKitchen';

const options = ['Select food...', 'Select kitchen...'];

const SearchBar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select food...');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  return (
    <>
      <Pressable onPress={() => setDropdownVisible(!dropdownVisible)}>
        <View className="mx-4 flex-row mt-4 bg-primary rounded-xl p-3 shadow-lg shadow-maroon items-center">
          <MagnifyingGlassIcon size={30} color="#FF7400" strokeWidth={1} stroke="#FF7400" />
          <TextInput
            editable={false}
            placeholder={selectedOption}
            className="ml-2 font-semibold text-lg flex-1 text-[#FF7400]"
            placeholderTextColor="#FF7400"
          />
          {dropdownVisible ? (
            <ChevronUpIcon size={20} color="#FF7400" strokeWidth={1} stroke="#FF7400"/>
          ) : (
            <ChevronDownIcon size={20} color="#FF7400" strokeWidth={1} stroke="#FF7400"/>
          )}
        </View>
      </Pressable>

      {dropdownVisible && (
        <View className="mx-4 mt-2 bg-white rounded-xl shadow-lg border border-gray p-4">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleOptionSelect(option);
                setModalVisible(true);
              }}
              className="p-4 border-b border-gray-200"
            >
              <Text className="text-orange font-semibold text-lg">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedOption === 'Select food...' && (
        <SearchFood
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          placeholder={selectedOption}
        />
      )}

      {selectedOption === 'Select kitchen...' && (
        <SearchKitchen
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          placeholder={selectedOption}
        />
      )}
    </>
  );
};

export default SearchBar;