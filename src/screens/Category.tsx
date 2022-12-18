import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, FlatList, Icon, Text, View, VStack } from "native-base";
import React from "react";

export default function Category() {
  const navigation = useNavigation<any>();
  const categoriesData = [
    {
      category: "Work",
      icon: { provider: MaterialIcons, namee: "work-outline" },
    },
    {
      category: "Life",
      icon: { provider: FontAwesome, namee: "heart-o" },
    },
    {
      category: "Personal",
      icon: { provider: AntDesign, namee: "user" },
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
