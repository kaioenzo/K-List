import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Account from "./Account";
import CreateTask from "./CreateTask";
import HomeTask from "./HomeTask";

export default function Home() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeTask}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        component={CreateTask}
        name="CreateTask"
        options={{
          headerShown: false,
          title: "",
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
