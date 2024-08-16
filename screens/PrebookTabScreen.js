import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import React, { useState } from "react";
import KitchenDisplay from "../components/KitchenDisplay";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import SearchBar from "../components/SearchBar";

const PrebookTabScreen = () => {
  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate()+1),"YYYY/MM/DD")
  const endDate = getFormatedDate(
    today.setDate(today.getDate() + 10),
    "YYYY/MM/DD"
  );
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  function handlePress() {
    setOpen(!open);
  }
  function handleChange(chosenDate) {
    setDate(chosenDate);
  }
  return (
    <View className="flex-1 bg-primary">
      <View className="flex-row mr-4">
        <View className="flex-1">
          <SearchBar placeholder="Search restaurant..." />
        </View>
        <View className="w-28 justify-center items-center">
          <TouchableOpacity onPress={handlePress}>
            <Text className="mt-3 font-semibold text-center">{date == "" ? "Click to Select Date" : date}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View className="flex-1 justify-center items-center">
          <View className="m-4 bg-primary rounded-lg w-[90%] p-5 items-center shadow-lg shadow-black ">
            <DatePicker
              options={{
                backgroundColor: "#FEFDED",
                textHeaderColor: "#5bb450",
                textDefaultColor: "#A1C398",
                selectedTextColor: "#FEFDED",
                mainColor: "#FA7070",
                textSecondaryColor: "#A1C398",
                borderColor: "#C70039",
              }}
              mode="calendar"
              selected={date}
              minimumDate={startDate}
              maximumDate={endDate}
              onDateChange={handleChange}
            />
            <TouchableOpacity onPress={handlePress}>
              <Text className="text-maroon">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KitchenDisplay prebook={true} />
        <KitchenDisplay prebook={true} />
        <KitchenDisplay prebook={true} />
        <KitchenDisplay prebook={true} />
        <KitchenDisplay prebook={true} />
        <KitchenDisplay prebook={true} />
        <KitchenDisplay prebook={true} />
        <KitchenDisplay prebook={true} />
      </ScrollView>
    </View>
  );
};
export default PrebookTabScreen;
