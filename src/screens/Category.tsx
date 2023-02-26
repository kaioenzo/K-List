import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Button, FlatList, Icon, Text, View, VStack } from "native-base";
import React from "react";
import { RootStackParamList } from "../types";

export default function Category() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const categoriesData = [
    {
      category: "Work",
      icon: { provider: MaterialIcons, namee: "work-outline" },
    },
    {
      category: "Life",
      icon: { provider: FontAwesome, namee: "heart-o" },
    },
    { category: "Home", icon: { provider: Feather, namee: "home" } },
    { category: "Study", icon: { provider: AntDesign, namee: "book" } },
    {
      category: "Others",
      icon: { provider: Entypo, namee: "dots-three-horizontal" },
    },
  ];

  return (
    <View>
      <VStack safeAreaY>
        <FlatList
          data={categoriesData}
          numColumns={2}
          keyExtractor={(item, index) => item.category + index}
          renderItem={({ item }) => (
            <Button
              borderRadius="lg"
              shadow="7"
              backgroundColor="#ebf4f3"
              m={2}
              py={10}
              flexGrow={1}
              onPress={() => {
                navigation.navigate("CreateTask", {
                  category: item.category,
                });
              }}
            >
              <Box alignItems="center">
                <Icon
                  as={<item.icon.provider name={`${item.icon.namee}`} />}
                  size="5xl"
                />
                <Text>{item.category}</Text>
              </Box>
            </Button>
          )}
        />
      </VStack>
    </View>
  );
}
