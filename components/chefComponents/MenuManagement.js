import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { app, db, auth } from '../../firebaseConfig'; // Import Firebase config
import { getFirestore, doc, updateDoc, collection, query, where, getDocs, setDoc, deleteDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

const MenuManagement = () => {
  const [dishName, setDishName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState(null);
  const [description, setDescription] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [kitchenID, setKitchenID] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [updatedValue, setUpdatedValue] = useState('');

  const fetchKitchenID = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('No user is logged in');
        return;
      }

      const kitchensRef = collection(db, 'kitchens');
      const q = query(kitchensRef, where('userId', '==', user.uid));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setKitchenID(querySnapshot.docs[0].id);
      } else {
        console.log('No kitchen found for this user!');
      }
    } catch (error) {
      console.error('Error fetching kitchen ID:', error);
    }
  };

  useEffect(() => {
    fetchKitchenID();
  }, []);

  const fetchMenuItems = async () => {
    if (!kitchenID) return;
    try {
      const menuRef = collection(db, `kitchens/${kitchenID}/menu`);
      const querySnapshot = await getDocs(menuRef);
      const menuList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuItems(menuList);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  useEffect(() => {
    if (kitchenID) {
      fetchMenuItems();
    }
  }, [kitchenID]);

  const handleAddDish = async () => {
    if (!dishName || !price || !type) {
      alert('Please fill all required fields!');
      return;
    }
  
    if (!kitchenID) {
      alert('Kitchen not found for this user!');
      return;
    }
  
    try {
      const menuRef = doc(collection(db, `kitchens/${kitchenID}/menu`), dishName);
      const globalDishRef = doc(db, 'dishes', dishName);
  
      const dishData = {
        name: dishName,
        price: parseFloat(price),
        type,
        description,
      };
  
      const imageName = dishName.toLowerCase().replace(/\s+/g, '');
  
      // Check if the dish already exists in the global collection
      const globalDishSnap = await getDoc(globalDishRef);
  
      if (globalDishSnap.exists()) {
        // If dish exists, update its categories array without resetting
        console.log("Dish exists in dishes")
      } else {
        // If dish does not exist, create it
        await setDoc(globalDishRef, { name: dishName, categories: [], imageUrl: imageName });
      }
  
      // Always add dish to the kitchen's menu (even if it exists globally)
      await setDoc(menuRef, dishData);
  
      console.log('Dish added successfully!');
      fetchMenuItems();
    } catch (error) {
      console.error('Error adding dish:', error);
      alert('Error adding dish!');
    }
  
    setDishName('');
    setPrice('');
    setType(null);
    setDescription('');
    setIsFormVisible(false);
  };  

  const handleEditField = async (dishId, field, value) => {
    try {
      const menuRef = doc(db, `kitchens/${kitchenID}/menu`, dishId);
      await updateDoc(menuRef, { [field]: value });
      fetchMenuItems();
    } catch (error) {
      console.error('Error updating dish:', error);
    }
  };

  const handleSaveEdit = async (dishId, field) => {
    if (!updatedValue.trim()) return;

    await handleEditField(dishId, field, updatedValue);
    setEditingItem(null);
    setEditingField(null);
  };

  const handleDeleteDish = async (dishId) => {
    try {
      const menuRef = doc(db, `kitchens/${kitchenID}/menu`, dishId);
      await deleteDoc(menuRef);
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting dish:', error);
    }

  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <View className="mb-10">
        {/* Menu Heading */}
        <Text className="text-3xl font-bold text-black mb-4">Menu</Text>

        {/* Add Items Button */}
        <TouchableOpacity onPress={() => setIsFormVisible(!isFormVisible)}>
          <Text className="text-white rounded-xl px-3 py-2 font-bold text-xl bg-yellow absolute">
            {isFormVisible ? 'Close' : 'Add Dishes'}
          </Text>
        </TouchableOpacity>

        {/* Add Menu Item Form - Visible When Toggled */}
        {isFormVisible && (
          <View className="mt-10">
            <Text className="text-2xl font-semibold mt-10 mb-2 text-gray-800">Add Dish</Text>

            <Text className="text-lg font-bold mb-2 text-orange">Dish Name:</Text>
            <TextInput
              placeholder="E.g Idly"
              value={dishName}
              onChangeText={setDishName}
              className="border-2 border-yellow p-3 rounded-lg mb-3 text-lg"
            />

            <Text className="text-lg font-bold mb-2 text-orange">Price (in Rs):</Text>
            <TextInput
              placeholder="Eg. 40"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              className="border-2 border-yellow p-3 rounded-lg mb-3 text-lg"
            />

            {/* Veg / Non-Veg Selection */}
            <View className="flex-row items-center mb-3">
              <Text className="text-lg font-bold text-orange mr-3">Type: </Text>

              <TouchableOpacity onPress={() => setType('veg')}>
                <Text className={`p-2 px-4 ml-3 rounded-lg text-lg font-medium  ${type === 'veg' ? 'bg-green text-white' : 'bg-gray text-black'}`}>Veg</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setType('nonveg')}>
                <Text className={`p-2 px-4 ml-3 rounded-lg text-lg font-medium  ${type === 'nonveg' ? 'bg-maroon text-white' : 'bg-gray text-black'}`}>Non-Veg</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-lg font-bold mb-2 text-orange">Description (optional):</Text>
            <TextInput
              placeholder="Pieces per set, side dishes, etc."
              value={description}
              onChangeText={setDescription}
              className="border-2 border-yellow p-3 rounded-lg text-lg mb-5"
            />

            <TouchableOpacity onPress={handleAddDish}>
              <Text className="text-white rounded-xl px-4 py-2 text-lg bg-green absolute">Add</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Menu List with FlatList */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="pb-3 mt-6 flex-row items-center justify-between bg-gray rounded-lg px-5 p-3">
            <View className="flex-1">
              <Text className="text-2xl font-bold">{item.name}</Text>

              {/* Price Field */}
              <View className="flex-row items-center">
                {editingItem === item.id && editingField === 'price' ? (
                  <>
                    <TextInput
                      value={updatedValue}
                      onChangeText={setUpdatedValue}
                      className="p-2 mr-2 text-xl border border-orange text-orange rounded-lg w-auto"
                      keyboardType="numeric"
                      autoFocus
                    />
                    <TouchableOpacity onPress={() => handleSaveEdit(item.id, 'price')}>
                      <MaterialIcons name="check" size={20} color="green" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text className="text-xl text-orange mr-3">₹{item.price}</Text>
                    <TouchableOpacity onPress={() => {
                      setEditingItem(item.id);
                      setEditingField('price');
                      setUpdatedValue(String(item.price));
                    }}>
                      <MaterialIcons name="edit" size={20} color="orange" />
                    </TouchableOpacity>
                  </>
                )}
              </View>

              {/* Type (Veg/Non-Veg) Field */}
              <View className="flex-row items-center">
                {editingItem === item.id && editingField === 'type' ? (
                  <>
                    <TouchableOpacity
                      onPress={() => setUpdatedValue('veg')}
                      className="flex-row items-center mr-3"
                    >
                      <MaterialIcons
                        name={updatedValue === 'veg' ? 'radio-button-checked' : 'radio-button-unchecked'}
                        size={20}
                        color="green"
                      />
                      <Text className="ml-1 text-lg">Veg</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setUpdatedValue('nonveg')}
                      className="flex-row items-center mr-3"
                    >
                      <MaterialIcons
                        name={updatedValue === 'nonveg' ? 'radio-button-checked' : 'radio-button-unchecked'}
                        size={20}
                        color="red"
                      />
                      <Text className="ml-1 text-lg">Non-Veg</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleSaveEdit(item.id, 'type')}>
                      <MaterialIcons name="check" size={20} color="green" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text className={`text-lg ${item.type === 'veg' ? 'text-green' : 'text-maroon'} mr-3`}>
                      {item.type === 'veg' ? 'Veg' : 'Non-Veg'}
                    </Text>
                    <TouchableOpacity onPress={() => {
                      setEditingItem(item.id);
                      setEditingField('type');
                      setUpdatedValue(item.type);
                    }}>
                      <MaterialIcons name="edit" size={20} color="orange" />
                    </TouchableOpacity>
                  </>
                )}
              </View>


              {/* Description Field */}
              <View className="flex-row items-center">
                {editingItem === item.id && editingField === 'description' ? (
                  <>
                    <TextInput
                      value={updatedValue}
                      onChangeText={setUpdatedValue}
                      className="p-2 mr-2 text-xl border border-yellow text-yellow rounded-lg w-auto"
                      autoFocus
                    />
                    <TouchableOpacity onPress={() => handleSaveEdit(item.id, 'description')}>
                      <MaterialIcons name="check" size={20} color="green" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text className="text-lg text-yellow mr-3">{item.description}</Text>
                    <TouchableOpacity onPress={() => {
                      setEditingItem(item.id);
                      setEditingField('description');
                      setUpdatedValue(item.description);
                    }}>
                      <MaterialIcons name="edit" size={20} color="orange" />
                    </TouchableOpacity>
                  </>
                )}
              </View>


            </View>

            {/* Delete Dish Button */}
            <TouchableOpacity onPress={() => handleDeleteDish(item.id)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default MenuManagement;