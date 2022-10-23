import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreateTask from "../screens/CreateTask";
import Home from "../screens/Home";
const Stack = createNativeStackNavigator();
export default function Routes(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeRoutes"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateTask"
          component={CreateTask}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
