import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FAB } from "react-native-paper";

const FABNav = () => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const Navigation = useNavigation();

  return (
    <FAB.Group
      open={open}
      visible
      color="#FF7400"
      icon={open ? "arrow-down" : "arrow-up"}
      fabStyle={{
        backgroundColor: "#FFAA00",
        borderColor: "#FF7400",
        borderWidth: 2,
      }}
      actions={[
        {
          icon: "account",
          label: "Profile",
          color: "#FF7400",
          labelTextColor: "#FF7400",
          style: { backgroundColor: "#EDEDED" },
          onPress: () => Navigation.navigate("ChefProfile"),
        },
        {
          icon: "alarm",
          label: "Orders Taken",
          color: "#FF7400",
          labelTextColor: "#FF7400",
          onPress: () => Navigation.navigate("ChefOrders"),
          style: { backgroundColor: "#EDEDED" },
        },
        {
          icon: "email",
          label: "Order Requests",
          color: "#FF7400",
          labelTextColor: "#FF7400",
          style: { backgroundColor: "#EDEDED" },
          onPress: () => Navigation.navigate("OrderRequest"),
        },
        {
          icon: "bell",
          label: "Reminders",
          color: "#FF7400",
          labelTextColor: "#FF7400",
          style: { backgroundColor: "#EDEDED" },
          onPress: () => Navigation.navigate("Reminders"),
        },
        {
          icon: "home",
          label: "Home",
          color: "#FF7400",
          labelTextColor: "#FF7400",
          style: { backgroundColor: "#EDEDED" },
          onPress: () => Navigation.navigate("ChefLandingScreen"),
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        if (open) {
          // do something if the speed dial is open
        }
      }}
    />
  );
};

export default FABNav;
