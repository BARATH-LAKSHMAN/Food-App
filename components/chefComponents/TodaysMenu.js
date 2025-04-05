import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { auth, db } from "../../firebaseConfig";
import { collection, doc, getDoc, getDocs, query, where, onSnapshot } from "firebase/firestore";

const TodaysMenu = () => {
    const [kitchenID, setKitchenID] = useState(null);
    const [menuData, setMenuData] = useState({});

    useEffect(() => {
        fetchKitchenID();
    }, []);

    useEffect(() => {
        if (kitchenID) {
            fetchTodaysMenu();
            listenForMenuUpdates();
        }
    }, [kitchenID]);

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

    const fetchTodaysMenu = async () => {
        try {
            const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()).trim();
            console.log("✅ Today's day:", today);
            console.log("✅ Kitchen ID:", kitchenID);

            if (!kitchenID) {
                console.error("❌ Kitchen ID is undefined. Exiting function.");
                return;
            }

            const dayDocRef = doc(db, `kitchens/${kitchenID}/weeklySchedule`, today);
            const dayDocSnap = await getDoc(dayDocRef);

            if (!dayDocSnap.exists()) {
                console.log(`❌ No menu found for ${today}.`);
                return;
            }

            processMenuData(dayDocSnap.data());
        } catch (error) {
            console.error('🔥 Error fetching today’s menu:', error);
        }
    };

    const listenForMenuUpdates = () => {
        const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()).trim();
        const dayDocRef = doc(db, `kitchens/${kitchenID}/weeklySchedule`, today);
        
        return onSnapshot(dayDocRef, (docSnap) => {
            if (docSnap.exists()) {
                console.log("🔄 Real-time update detected, updating menu...");
                processMenuData(docSnap.data());
            } else {
                console.log("❌ Menu document deleted or unavailable.");
                setMenuData({});
            }
        });
    };

    const processMenuData = async (dayData) => {
        if (!dayData || typeof dayData !== "object") {
            console.error("❌ Day data is not an object or is undefined.");
            return;
        }

        const mealTypes = ["Breakfast", "Lunch", "Dinner"];
        let fetchedMenu = {};

        for (let meal of mealTypes) {
            if (!dayData[meal.toLowerCase()]) {
                fetchedMenu[meal] = [];
                continue;
            }

            const mealDishes = dayData[meal.toLowerCase()];
            if (!Array.isArray(mealDishes)) {
                console.error(`❌ Invalid data for ${meal}:`, mealDishes);
                return [];
            }

            fetchedMenu[meal] = await Promise.all(
                mealDishes.map(async (dish) => {
                    const dishName = dish.dishName;
                    if (!dishName) {
                        console.error("❌ Invalid dish entry:", dish);
                        return null;
                    }

                    const dishDocRef = doc(db, `kitchens/${kitchenID}/menu`, dishName);
                    const dishDocSnap = await getDoc(dishDocRef);
                    const price = dishDocSnap.exists() ? dishDocSnap.data().price : "N/A";

                    return {
                        name: dishName,
                        quantity: dish.quantity || 0,
                        sold: dish.sold || 0,
                        price,
                    };
                })
            );
        }

        console.log("✅ Final Menu Data:", fetchedMenu);
        setMenuData(fetchedMenu);
    };

    return (
        
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mx-8">
                {Object.keys(menuData).map((mealType) => (
                    <View key={mealType}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 12, color: "#FFAA00" }}>
                            {mealType}
                        </Text>
                        <DataTable>
                            <DataTable.Header className="bg-gray">
                                <DataTable.Title textStyle={{ color: "#FFAA00", fontWeight: "800" }} style={{ flex: 2 }}>
                                    Name
                                </DataTable.Title>
                                <DataTable.Title textStyle={{ color: "#FFAA00", fontWeight: "800" }} style={{ flex: 1.5 }}>
                                    Quantity
                                </DataTable.Title>
                                <DataTable.Title textStyle={{ color: "#FFAA00", fontWeight: "800" }} style={{ flex: 1 }}>
                                    Price
                                </DataTable.Title>
                                <DataTable.Title textStyle={{ color: "#FFAA00", fontWeight: "800" }} style={{ flex: 1 }}>
                                    Sold
                                </DataTable.Title>
                            </DataTable.Header>
                            {menuData[mealType].map((dish, index) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell style={{ flex: 2 }}>{dish.name}</DataTable.Cell>
                                    <DataTable.Cell style={{ flex: 1.5 }}>{dish.quantity}</DataTable.Cell>
                                    <DataTable.Cell style={{ flex: 1 }}>{dish.price}</DataTable.Cell>
                                    <DataTable.Cell style={{ flex: 1 }}>{dish.sold}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default TodaysMenu;