import {
  Box,
  Center,
  CheckIcon,
  FlatList,
  Select,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { useNoteStore } from "../repository/Store";
import { createTable } from "../services/NotesService";
export default function HomeTask() {
  const [categoriaHome, setCategoriaHome] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  const toDos = useNoteStore((state) => state.toDos);
  const clearDataBase = useNoteStore((state) => state.clearAll);

  useEffect(() => {
    const fetchNotes = async () => {
      await createTable();
      useNoteStore.getState().startStat();
      setIsLoading(false);
    };
    fetchNotes();
  }, []);

  if (isLoading === true) {
    return (
      <VStack safeAreaY flex={1}>
        <Center>
          <Spinner />
        </Center>
      </VStack>
    );
  }
  if (toDos === null && !isLoading) {
    return (
      <VStack safeAreaY flex={1}>
        <Text>Ainda náo há nada por aqui</Text>
        {/*  TODO - Add a button to add a new note */}
      </VStack>
    );
  }
  const filterTodo = (category: string) => {
    if (category === "ALL") return toDos;
    return toDos?.filter(
      (note) => note.category.toLowerCase() === category.toLowerCase()
    );
  };

  return (
    <VStack safeAreaY flex={1} background={"#6135bc"}>
      <Box pb={32}>
        <Text fontSize="xl" bold color="white">
          Hi, Kaio
        </Text>
        {/* <Button onPress={() => clearDataBase()}>Clear all</Button> */}
      </Box>
      <FlatList
        backgroundColor="white"
        keyExtractor={(item, index) => item.title + index}
        borderTopRadius={50}
        data={filterTodo(categoriaHome)}
        ListHeaderComponent={
          <Center>
            <Box maxW="300">
              <Select
                selectedValue={categoriaHome}
                minWidth="200"
                accessibilityLabel="Choose Service"
                placeholder="Choose Service"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setCategoriaHome(itemValue)}
              >
                <Select.Item label="ALL" value="ALL" />
                <Select.Item label="HOME" value="HOME" />
                <Select.Item label="WORK" value="WORK" />
                <Select.Item label="STUDY" value="STUDY" />
                <Select.Item label="LIFE" value="LIFE" />
                <Select.Item label="OTHERS" value="OTHERS" />
              </Select>
            </Box>
          </Center>
        }
        renderItem={(item) => (
          <>
            <NoteCard
              title={item.item.title}
              date={item.item.date}
              hour={item.item.hour}
              description={item.item.description}
              category={item.item.category}
              done={item.item.done}
              notify={item.item.notify}
              id={item.item.id}
            />
          </>
        )}
      />
    </VStack>
  );
}
