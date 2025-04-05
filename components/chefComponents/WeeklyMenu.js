import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView, TextInput } from "react-native";
import { app, db, auth } from '../../firebaseConfig'; // Import Firebase config
import { getFirestore, doc, collection, query, where, setDoc, getDoc, getDocs, updateDoc, arrayRemove } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const categories = ["Breakfast", "Lunch", "Dinner"];

const WeeklyMenu = () => {
    const [selectedDays, setSelectedDays] = useState([]); // Store multiple selected days
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownState, setDropdownState] = useState({}); // Controls dish dropdowns for each day
    const [dishFormState, setDishFormState] = useState({}); // Controls form visibility
    const [selectedDish, setSelectedDish] = useState({}); // Stores selected dish per day
    const [quantity, setQuantity] = useState({});
    const [kitchenID, setKitchenID] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [menuData, setMenuData] = useState({});
    const [editingDish, setEditingDish] = useState(null);
    const [newQuantity, setNewQuantity] = useState("");

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
        try {
            if (!kitchenID) {
                console.error('Kitchen ID not found');
                return;
            }

            const menuRef = collection(db, 'kitchens', kitchenID, 'menu');
            const querySnapshot = await getDocs(menuRef);
            const menuItems = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return { name: data.name }; // Fetching name and price
            });

            if (menuItems.length > 0) {
                setDishes(menuItems); //
            } else {
                console.log('No menu items found');
            }
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    useEffect(() => {
        if (kitchenID) {
            fetchMenuItems();
        }
    }, [kitchenID]);

    const fetchMenuData = async (day) => {
        try {
            if (!kitchenID) {
                console.error('Kitchen ID not found');
                return;
            }

            const dayDocRef = doc(db, 'kitchens', kitchenID, 'weeklySchedule', day);
            const daySnapshot = await getDoc(dayDocRef);

            if (daySnapshot.exists()) {
                setMenuData(prev => ({ ...prev, [day]: daySnapshot.data() }));
            } else {
                setMenuData(prev => ({ ...prev, [day]: {} }));
            }
        } catch (error) {
            console.error(`Error fetching menu for ${day}:`, error);
        }
    };

    const fetchWeeklyMenu = async () => {
        try {
            if (!kitchenID) {
                console.error('Kitchen ID not found');
                return;
            }

            const weeklyRef = collection(db, 'kitchens', kitchenID, 'weeklySchedule');
            const querySnapshot = await getDocs(weeklyRef);
            let weeklyData = {};
            let daysWithData = []; // Store days that have menu items

            querySnapshot.forEach((doc) => {
                weeklyData[doc.id] = doc.data();
                daysWithData.push(doc.id); // Add days that have menu data
            });

            setMenuData(weeklyData);
            setSelectedDays(daysWithData); // Restore selected days
        } catch (error) {
            console.error('Error fetching weekly menu:', error);
        }
    };


    // Fetch menu when kitchenID is available
    useEffect(() => {
        if (kitchenID) {
            fetchWeeklyMenu();
        }
    }, [kitchenID]);

    const saveMenuData = async (day) => {
        try {
            if (!kitchenID) {
                console.error('Kitchen ID not found');
                return;
            }

            const dayDocRef = doc(db, 'kitchens', kitchenID, 'weeklySchedule', day);
            const dishDocRef = doc(db, 'dishes', selectedDish[day]?.name); // Reference to the dish document
            const selectedCategories = selectedDish[`${day}_categories`] || [];

            // Fetch existing data for the selected day
            const dayDocSnapshot = await getDoc(dayDocRef);
            let existingData = dayDocSnapshot.exists() ? dayDocSnapshot.data() : {
                breakfast: [],
                lunch: [],
                dinner: []
            };

            let updatedData = { ...existingData }; // Keep existing data
            let dishAlreadyExists = false;

            selectedCategories.forEach(category => {
                const categoryKey = category.toLowerCase();
                const existingDishes = existingData[categoryKey] || [];

                // Check if dish already exists in the selected category
                if (existingDishes.some(dish => dish.dishName === selectedDish[day]?.name)) {
                    dishAlreadyExists = true;
                } else {
                    // Add new dish if not a duplicate
                    updatedData[categoryKey] = [
                        ...existingDishes,
                        {
                            dishName: selectedDish[day]?.name || "",
                            quantity: quantity[day] || "0",
                            sold: 0,
                        }
                    ];
                }
            });

            if (dishAlreadyExists) {
                alert("Dish already exists");
                return; // Stop execution if duplicate is found
            }

            await setDoc(dayDocRef, updatedData, { merge: true });
            console.log(`Menu for ${day} updated successfully`);

            // Update dish's categories in the 'dishes' collection
            const dishDocSnapshot = await getDoc(dishDocRef);
            if (dishDocSnapshot.exists()) {
                const dishData = dishDocSnapshot.data();
                const updatedCategories = Array.from(new Set([...(dishData.categories || []), ...selectedCategories]));

                await updateDoc(dishDocRef, { categories: updatedCategories });
                console.log(`Categories updated for ${selectedDish[day]?.name}`);
            }

            // Clear form after adding
            setDishFormState(prev => ({ ...prev, [day]: false }));
            setSelectedDish(prev => ({
                ...prev,
                [day]: null,
                [`${day}_categories`]: []
            }));
            setQuantity(prev => ({ ...prev, [day]: "" }));

            // Refresh menu data
            fetchWeeklyMenu();
        } catch (error) {
            console.error(`Error saving menu for ${day}:`, error);
        }
    };

    const deleteDish = async (day, category, dishName) => {
        try {
            if (!kitchenID) {
                console.error("Kitchen ID not found");
                return;
            }

            const dayRef = doc(db, "kitchens", kitchenID, "weeklySchedule", day);
            const updatedDishes = menuData[day][category].filter(dish => dish.dishName !== dishName);

            await updateDoc(dayRef, {
                [category]: updatedDishes.length > 0 ? updatedDishes : [], // Ensure array is updated or removed if empty
            });

            // Update local state
            setMenuData(prev => ({
                ...prev,
                [day]: {
                    ...prev[day],
                    [category]: updatedDishes,
                },
            }));

        } catch (error) {
            console.error("Error deleting dish:", error);
        }
    };

    const saveQuantity = async (day, category, dishName, updatedQuantity) => {
        try {
            if (!kitchenID) {
                console.error("Kitchen ID not found");
                return;
            }

            const dayRef = doc(db, "kitchens", kitchenID, "weeklySchedule", day);
            const updatedDishes = menuData[day][category].map(dish =>
                dish.dishName === dishName ? { ...dish, quantity: parseInt(updatedQuantity) } : dish
            );

            await updateDoc(dayRef, {
                [category]: updatedDishes,
            });

            // Update local state
            setMenuData(prev => ({
                ...prev,
                [day]: {
                    ...prev[day],
                    [category]: updatedDishes,
                },
            }));

            setEditingDish(null); // Exit edit mode

        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    // Fetch menu data when a new day is selected
    useEffect(() => {
        selectedDays.forEach(day => fetchMenuData(day));
    }, [selectedDays]);

    const toggleDay = (day) => {
        setShowDropdown(false);
        if (!selectedDays.includes(day)) {
            setSelectedDays([...selectedDays, day]); // Add new day instead of replacing
        }
    };

    const toggleDishForm = (day) => {
        setDishFormState(prevState => ({
            ...prevState,
            [day]: !prevState[day]
        }));
    };

    return (
        <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
            <View className="mb-10">
                <Text className="text-3xl font-bold text-black mb-4">Weekly Menu</Text>

                <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
                    <View className="flex-row items-center w-40 bg-orange rounded-xl px-3 py-2">
                        <Text className="text-white font-bold text-xl ml-3">Add Day</Text>
                        <MaterialIcons name={showDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={28} color="white" className="ml-1" />
                    </View>
                </TouchableOpacity>

                {showDropdown && (
                    <View className="bg-gray p-4 rounded-lg mt-2">
                        {daysOfWeek.map((day) => (
                            <TouchableOpacity
                                key={day}
                                className="p-2 border-b border-gray"
                                onPress={() => toggleDay(day)}
                            >
                                <Text className="text-lg font-semibold text-yellow">{day}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <FlatList
                    data={selectedDays}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <View className="mt-4 bg-gray p-4 rounded-lg">
                            <Text className="text-xl font-bold mb-3">{item}</Text>
                            <TouchableOpacity onPress={() => toggleDishForm(item)}>
                                <View className="flex-row items-center">
                                    <Text className="font-semibold text-yellow text-lg">{dishFormState[item] ? "Close" : "Add Dish"}</Text>
                                    <MaterialIcons name={dishFormState[item] ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="orange" className="ml-1" />
                                </View>
                            </TouchableOpacity>

                            {/* Dishes Dropdown */}
                            {dishFormState[item] && (
                                <View className="bg-white p-2 rounded-md mt-1">
                                    <Text className="font-semibold text-orange mb-1">Dish Name:</Text>
                                    <TouchableOpacity onPress={() => setDropdownState(prevState => ({ ...prevState, [item]: !prevState[item] }))}>
                                        <View className="flex-row items-center justify-between border border-orange p-2 rounded-md">
                                            <Text className="text-md text-yellow">
                                                {selectedDish[item] ? `${selectedDish[item].name}` : "Select a dish"}
                                            </Text>
                                            <MaterialIcons name={dropdownState[item] ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={20} color="orange" />
                                        </View>
                                    </TouchableOpacity>
                                    {dropdownState[item] && (
                                        <View className="mt-2 bg-gray px-2 py-1 rounded-md">
                                            {dishes.map(({ name, price }) => (
                                                <TouchableOpacity key={name} onPress={() => {
                                                    setSelectedDish(prev => ({ ...prev, [item]: { name } }));
                                                    setDropdownState(prevState => ({ ...prevState, [item]: false }));
                                                }}>
                                                    <Text className={`text-md ${selectedDish[item]?.name === name ? "font-bold" : "font-normal"} text-maroon mb-1 mt-1`}>
                                                        {name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}

                                    {/* Categories Dropdown */}
                                    <Text className="font-semibold text-orange mb-1 mt-3">Categories:</Text>
                                    <TouchableOpacity onPress={() => setDropdownState(prevState => ({ ...prevState, [`${item}_categories`]: !prevState[`${item}_categories`] }))}>
                                        <View className="flex-row items-center justify-between border border-orange p-2 rounded-md">
                                            <Text className="text-md text-yellow">{selectedDish[`${item}_categories`] ? selectedDish[`${item}_categories`].join(", ") : "Select categories"}</Text>
                                            <MaterialIcons name={dropdownState[`${item}_categories`] ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={20} color="orange" />
                                        </View>
                                    </TouchableOpacity>
                                    {dropdownState[`${item}_categories`] && (
                                        <View className="mt-2 bg-gray px-2 py-1 rounded-md">
                                            {categories.map(category => (
                                                <TouchableOpacity key={category} onPress={() => {
                                                    setSelectedDish(prev => {
                                                        const currentCategories = prev[`${item}_categories`] || [];
                                                        return {
                                                            ...prev,
                                                            [`${item}_categories`]: currentCategories.includes(category)
                                                                ? currentCategories.filter(c => c !== category)
                                                                : [...currentCategories, category]
                                                        };
                                                    });
                                                }}>
                                                    <Text className={`text-md ${selectedDish[`${item}_categories`] && selectedDish[`${item}_categories`].includes(category) ? "font-bold" : "font-normal"} text-maroon mb-1 mt-1`}>
                                                        {category}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}

                                    {/* Quantity Input */}
                                    <Text className="font-semibold text-orange mb-1 mt-3">Quantity:</Text>
                                    <TextInput
                                        className="border border-orange p-2 rounded-md text-md text-yellow mb-3"
                                        keyboardType="numeric"
                                        placeholder="Enter quantity"
                                        placeholderTextColor="orange"
                                        value={quantity[item] || ""}
                                        onChangeText={(text) => setQuantity(prev => ({ ...prev, [item]: text }))}
                                    />

                                    {/* Add Button */}
                                    <TouchableOpacity onPress={() => saveMenuData(item)}>
                                        <View className="bg-green p-2 rounded-md mt-3 w-40">
                                            <Text className="text-white text-center font-bold text-lg">Add</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {/* Display added dishes */}
                            {menuData[item] && Object.entries(menuData[item])
                                .filter(([category, dishes]) => dishes.length > 0)
                                .map(([category, dishes]) => (
                                    <View key={category} className="mt-3">
                                        <Text className="text-lg font-bold text-orange">{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
                                        {dishes.map((dish, index) => (
                                            <View key={index} className="flex-row justify-between items-center">
                                                <View>
                                                    <Text className="text-md font-semibold text-maroon">{dish.dishName}</Text>
                                                    <View className="flex-row items-center">
                                                        {editingDish === dish.dishName ? (
                                                            <>
                                                                <TextInput
                                                                    value={newQuantity}
                                                                    onChangeText={setNewQuantity}
                                                                    keyboardType="numeric"
                                                                    className="border border-gray p-1 w-12 text-center"
                                                                />
                                                                <MaterialIcons
                                                                    name="check"
                                                                    size={16}
                                                                    color="green"
                                                                    onPress={() => saveQuantity(item, category, dish.dishName, newQuantity)}
                                                                />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Text className="text-sm text-green mb-2">Quantity: {dish.quantity}</Text>
                                                                <MaterialIcons
                                                                    name="edit"
                                                                    size={16}
                                                                    color="orange"
                                                                    className="ml-2 mb-2"
                                                                    onPress={() => { setEditingDish(dish.dishName); setNewQuantity(String(dish.quantity)); }}
                                                                />
                                                            </>
                                                        )}
                                                    </View>
                                                </View>
                                                <MaterialIcons
                                                    name="delete"
                                                    size={20}
                                                    color="gray"
                                                    onPress={() => deleteDish(item, category, dish.dishName)}
                                                />
                                            </View>
                                        ))}
                                    </View>
                                ))
                            }
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
};

export default WeeklyMenu;