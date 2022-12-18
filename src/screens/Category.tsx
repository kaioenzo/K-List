import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button, FlatList, HStack, Icon, Text, View } from "native-base";
import React from "react";

export default function Category() {
  const navigation = useNavigation<any>();
  const categories = [
    {
      category: "Work",
      icon: { provider: MaterialIcons, name: "work" },
    },
    {
      category: "Life",
      icon: { provider: FontAwesome, name: "heart" },
    },
    {
      category: "Personal",
      icon: { provider: FontAwesome5, name: "user-alt" },
    },
  ];
  type categories = {
    category: string;
    icon: {
      provider: typeof Icon;
      name: string;
    };
  }[];
  return (
    <View>
      <HStack safeAreaY>
        <FlatList
          data={categories}
          keyExtractor={(item, index) => item.category + index}
          renderItem={({ item }) => (
            <Button
              onPress={() => {
                navigation.navigate("CreateTask", { category: item.category });
              }}
            >
              <Text>{item.category}</Text>
              <Icon
                as={<item.icon.provider name={`${item.icon.name}`} />}
                size={5}
              />
            </Button>
          )}
        />
      </HStack>
    </View>
  );
}
