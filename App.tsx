/* eslint-disable react/no-unstable-nested-components */
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import dayjs from "dayjs";
import customPaseFormat from "dayjs/plugin/customParseFormat";
import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import { MenuProvider } from "react-native-popup-menu";
import TabBarIcon from "./src/components/TabBarIcon";
import Account from "./src/screens/Account";
import HomeTask from "./src/screens/HomeTask";
import TaskRoutes from "./src/screens/TaskRoutes";
import { PropsBottomNavigator } from "./src/types";

// Extend dayjs to parse custom formats
dayjs.extend(customPaseFormat);

// Define the config for theme
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export default function App() {
  const Tab = createBottomTabNavigator<PropsBottomNavigator>();
  return (
    <NativeBaseProvider>
      <MenuProvider>
        <NavigationContainer>
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
                tabBarIcon: ({ focused, color, size }) => {
                  return (
                    <TabBarIcon color={color} size={size} focused={focused} />
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
        </NavigationContainer>
      </MenuProvider>
    </NativeBaseProvider>
  );
}

// Color Switch Component
// function ToggleDarkMode() {
//   const { colorMode, toggleColorMode } = useColorMode();
//   return (
//     <HStack space={2} alignItems="center">
//       <Text>Dark</Text>
//       <Switch
//         isChecked={colorMode === "light"}
//         onToggle={toggleColorMode}
//         aria-label={
//           colorMode === "light" ? "switch to dark mode" : "switch to light mode"
//         }
//       />
//       <Text>Light</Text>
//     </HStack>
//   );
// }
