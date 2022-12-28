import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../types";
import Category from "./Category";
import { CreateTask } from "./CreateTask";
export default function TaskRoutes() {
  const TaskNavigation = createNativeStackNavigator<RootStackParamList>();

  return (
    <TaskNavigation.Navigator initialRouteName="Category">
      <TaskNavigation.Screen
        name="Category"
        component={Category}
        options={{ headerShown: false }}
      />
      <TaskNavigation.Screen
        name="CreateTask"
        component={CreateTask}
        options={{ headerShown: false }}
      />
    </TaskNavigation.Navigator>
  );
}
