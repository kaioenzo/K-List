import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Account from "./Account";
import HomeTask from "./HomeTask";
import TaskRoutes from "./TaskRoutes";

export default function Home() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 70 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTask}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="home" size={size + 10} color={color} />;
          },
        }}
      />
      <Tab.Screen
        component={TaskRoutes}
        name="TaskRoutes"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                style={{
                  position: "absolute",
                  bottom: -10,
                }}
                name="ios-add-circle"
                color={color}
                size={size + 40}
              />
            );
          },
          tabBarActiveTintColor: "#6135BC",
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons
                name="account-circle"
                size={size + 10}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
