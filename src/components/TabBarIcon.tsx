import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
interface TabBarIconProps {
  color: string;
  size: number;
  focused: boolean;
}
function TabBarIcon({ color, size, focused }: TabBarIconProps) {
  return (
    <Ionicons
      style={focused ? styles.iconFocused : styles.standard}
      name="ios-add-circle"
      color={color}
      size={size + 40}
    />
  );
}
const styles = StyleSheet.create({
  iconFocused: {
    position: "absolute",
    bottom: 20,
  },
  standard: {
    position: "absolute",
    bottom: -10,
  },
});
export default TabBarIcon;
