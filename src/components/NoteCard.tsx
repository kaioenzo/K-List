import { Entypo, MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Checkbox,
  Icon,
  IconButton,
  Pressable,
  Text,
} from "native-base";
import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Note } from "../models/Note";
import { useNoteStore } from "../repository/Store";

function NoteCard(data: Note) {
  const { setNoteDone, deleteNote } = useNoteStore();
  const [state, setState] = useState(data.done);
  const animation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animation.value }],
    };
  });

  const handlePress = () => {
    animation.value = withTiming(10, { duration: 200 });
    animation.value = withTiming(-10, { duration: 200 });
    animation.value = withTiming(0, { duration: 200 });
    deleteNote(data.id);
  };

  return (
    <Box flex={1} flexDirection="row" justifyContent="flex-start" mx={8} my={4}>
      <Box>
        <Text>{data.hour.slice(0, 5)}</Text>
        <Checkbox
          icon={<Icon as={MaterialIcons} name="done" color="green" />}
          value="TRUE"
          colorScheme="green"
          borderRadius="full"
          my={2}
          size="lg"
          accessibilityLabel="check your activitie to did"
          isChecked={state}
          onChange={(_) => {
            setState((_state) => !_state);
            setNoteDone(data.id);
          }}
        />
      </Box>

      <Box ml={6} flexDirection="column" w="79px" flexGrow={1} shadow={2}>
        <Pressable>
          {({ isHovered, isPressed }) => {
            return (
              <Box
                style={{
                  transform: [
                    {
                      scale: isPressed ? 0.96 : 1,
                    },
                  ],
                }}
              >
                <Text strikeThrough={state} bold>
                  {data.title}
                </Text>
                <Text
                  color="#666666"
                  strikeThrough={state}
                  numberOfLines={5}
                  flex={1}
                >
                  {data.description}
                </Text>
                <Box flexDir="row">
                  <Text bold>Category: </Text>
                  <Text>{data.category}</Text>
                </Box>
              </Box>
            );
          }}
        </Pressable>
      </Box>

      <Box>
        <Animated.View style={animatedStyles}>
          <IconButton
            onPress={handlePress}
            icon={<Icon as={Entypo} name="trash" color="#D11A2A" />}
          />
        </Animated.View>

        {state && (
          <Button
            alignSelf="flex-start"
            al
            size="xs"
            p={1}
            borderRadius="full"
            bgColor="#01cb48"
          >
            <Text color={"white"} fontSize="xs" mx={1}>
              Done
            </Text>
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default NoteCard;
