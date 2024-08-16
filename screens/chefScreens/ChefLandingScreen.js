import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataTable } from "react-native-paper";
import FABNav from "../../components/chefComponents/FABNav";

const ChefLandingScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="bg-white flex-1"
    >
      <View className="flex-row justify-between m-4 px-5 border-b border-gray">
        <View className="p-4 pr-16 justify-center border-r border-gray">
          <Text className="text-3xl">Hello</Text>
          <Text className="text-lg text-yellow font-semibold">Soundar</Text>
        </View>

        <View className="p-4 justify-center">
          {/* <Text className="text-xl mb-4">Today's stats</Text> */}
          <Text>
            Delivered: <Text className="text-orange font-semibold">20</Text>
          </Text>
          <Text>
            Earned: <Text className="text-orange font-semibold">3500</Text>
          </Text>
        </View>
      </View>
      <Text className="bg-gray p-2 text-center text-xl mx-4 mb-4">
        Wow Kitchen
      </Text>
      <Text className="text-lg text-center mb-4">Today's Menu</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-8">
          <DataTable className="">
            <DataTable.Header className="bg-gray">
              <DataTable.Title
                textStyle={{ color: "#FFAA00", fontWeight: "800" }}
              >
                Name
              </DataTable.Title>
              <DataTable.Title
                textStyle={{ color: "#FFAA00", fontWeight: "800" }}
              >
                Qty
              </DataTable.Title>
              <DataTable.Title
                textStyle={{ color: "#FFAA00", fontWeight: "800" }}
              >
                Price
              </DataTable.Title>
              <DataTable.Title
                textStyle={{ color: "#FFAA00", fontWeight: "800" }}
              >
                Sold
              </DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>Dosa</DataTable.Cell>
              <DataTable.Cell>20</DataTable.Cell>
              <DataTable.Cell>60</DataTable.Cell>
              <DataTable.Cell>5</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Dosa</DataTable.Cell>
              <DataTable.Cell>20</DataTable.Cell>
              <DataTable.Cell>60</DataTable.Cell>
              <DataTable.Cell>5</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Dosa</DataTable.Cell>
              <DataTable.Cell>20</DataTable.Cell>
              <DataTable.Cell>60</DataTable.Cell>
              <DataTable.Cell>5</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Dosa</DataTable.Cell>
              <DataTable.Cell>20</DataTable.Cell>
              <DataTable.Cell>60</DataTable.Cell>
              <DataTable.Cell>5</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Dosa</DataTable.Cell>
              <DataTable.Cell>20</DataTable.Cell>
              <DataTable.Cell>60</DataTable.Cell>
              <DataTable.Cell>5</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Dosa</DataTable.Cell>
              <DataTable.Cell>20</DataTable.Cell>
              <DataTable.Cell>60</DataTable.Cell>
              <DataTable.Cell>5</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Dosa</DataTable.Cell>
              <DataTable.Cell>20</DataTable.Cell>
              <DataTable.Cell>60</DataTable.Cell>
              <DataTable.Cell>5</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
      </ScrollView>

      <View className="bg-orange m-4 rounded-xl mb-10 overflow-hidden">
        <Text className="text-lg text-white text-center border-b p-4 border-gray bg-yellow">
          On Going Order
        </Text>
        <View className="p-4 text-white flex-row justify-between">
          <View>
            <Text className="text-gray">
              To: <Text className="text-black">Mr Barath</Text>
            </Text>
            <Text className="text-gray">
              Dosa <Text className="text-black">x2</Text>
            </Text>
            <Text className="text-gray">
              Dosa <Text className="text-black">x2</Text>
            </Text>
            <Text className="text-gray">
              Dosa <Text className="text-black">x2</Text>
            </Text>
          </View>
          <View>
            <Text className="text-gray">
              Delivery in <Text className="text-black">15 mins</Text>
            </Text>
            <Text className="text-gray">
              Amount paid: <Text className="text-black">300</Text>
            </Text>
          </View>
        </View>
      </View>
      <FABNav />
    </View>
  );
};

export default ChefLandingScreen;
