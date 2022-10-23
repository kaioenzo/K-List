import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Account from "./Account";
import HomeTask from "./HomeTask";

export default function Home() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeTask}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
}
