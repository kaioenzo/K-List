import { Box, FlatList, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { createTable, showNotes } from "../services/NotesService";
import { NotePropsFromDB } from "../types";
export default function HomeTask() {
  const [toDos, setToDos] = useState<NotePropsFromDB[]>();
  const [categoriaHome, setCategoriaHome] = useState("ok");
  useEffect(() => {
    createTable();
  }, []);

  useEffect(() => {
    showTodos();
  }, [categoriaHome]);

  const showTodos = async () => {
    const todos = await showNotes();
    console.log(todos);
    setToDos(todos);
  };
  if (toDos === undefined) {
    return (
      <VStack safeAreaY flex={1}>
        <Text>Sem notas por aqui!</Text>
      </VStack>
    );
  }
  return (
    <VStack safeAreaY flex={1} background={"#6135bc"}>
      <Box pb={48}>
        <Text fontSize="xl" bold color="white">
          Hi, Kaio
        </Text>
      </Box>
      <FlatList
        backgroundColor="white"
        keyExtractor={(item, index) => item.title + index}
        borderTopRadius={50}
        data={toDos}
        renderItem={(item) => (
          <>
            <NoteCard
              title={item.item.title}
              date={item.item.date}
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
