import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import React, { useState } from 'react';
import { PencilIcon, CheckIcon, XMarkIcon } from 'react-native-heroicons/solid';
import { getFirestore, doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { app, auth } from '../../firebaseConfig';
import MenuManagement from './MenuManagement';
import WeeklyMenu from './WeeklyMenu';

const ProfileSubComponents = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(props.desc);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const handleUpdate = async () => {
    try {
      const db = getFirestore(app);
      const kitchensRef = collection(db, "kitchens");
      const user = auth.currentUser;

      if (!user) {
        console.error("No user is logged in");
        return;
      }

      const q = query(kitchensRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const kitchenDoc = querySnapshot.docs[0];
        const kitchenRef = doc(db, "kitchens", kitchenDoc.id);

        await updateDoc(kitchenRef, {
          [props.field]: newValue,
        });

        setIsEditing(false);
      } else {
        console.error("No kitchen document found for this user.");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <View className="mx-4 flex-row justify-between bg-gray p-2 border-b border-white">
      <View className="flex-row w-full">
        <View className="flex-1">
          <Text className="text-lg p-1">{props.title}</Text>

          {props.button === "Edit" ? (
            isEditing ? (
              <TextInput
                className="text-yellow p-1 text-lg bg-white border border-gray rounded-md"
                value={newValue}
                onChangeText={setNewValue}
              />
            ) : (
              <ScrollView horizontal className="w-[65%]">
                <Text className="text-yellow p-1 text-lg pr-16">{props.desc}</Text>
              </ScrollView>
            )
          ) : (
            <ScrollView horizontal className="w-[65%]">
              <Text className="text-yellow p-1 text-lg pr-16">{props.desc}</Text>
            </ScrollView>
          )}
        </View>

        {props.button === "Edit" && (
          <View className="absolute right-2 top-2">
            <TouchableOpacity
              onPress={() => {
                isEditing ? handleUpdate() : setIsEditing(true);
              }}
            >
              <Text className="text-lg text-orange bg-yellow p-1 px-2 rounded-xl">
                {isEditing ? "Save " : "Edit"}
                {isEditing ? <CheckIcon color="#FF7400" size={12} /> : null}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {props.button === "View" && (
        <View className="absolute right-2 top-2">
          <TouchableOpacity onPress={() => setMenuModalVisible(true)}>
            <Text className="text-lg text-orange bg-yellow p-1 px-2 rounded-xl">View</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={menuModalVisible} animationType="slide" transparent={false}>
        <View className="flex-1 bg-white">
          <TouchableOpacity onPress={() => setMenuModalVisible(false)} className="absolute top-4 right-4">
            <Text className="text-maroon text-xl font-bold left-3 mt-3">X</Text>
          </TouchableOpacity>

          {props.title === "Main Menu" ? <MenuManagement /> : null}
          {props.title === "Weekly Menu" ? <WeeklyMenu /> : null}
        </View>
      </Modal>


    </View>
  );
};

export default ProfileSubComponents;