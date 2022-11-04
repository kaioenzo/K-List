import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Category from "./Category";
import CreateTask from "./CreateTask";
export default function TaskRoutes() {
  const TaskNavigation = createNativeStackNavigator();

  return (
    <TaskNavigation.Navigator>
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

    // <View>
    //   <HStack safeAreaY>
    //     <FlatList
    //       data={categories}
    //       keyExtractor={(item, index) => item.category + index}
    //       renderItem={({ item }) => (
    //         <Button onPress={() => navigation.navigate("CreateTask")}>
    //           <Text>{item.category}</Text>
    //           <Icon
    //             as={<item.icon.provider name={`${item.icon.name}`} />}
    //             size={5}
    //           />
    //         </Button>
    //       )}
    //     />
    //   </HStack>
    // </View>
  );
}
