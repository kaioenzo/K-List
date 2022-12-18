import { FlatList, Text, VStack } from "native-base";
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
    <VStack safeAreaY flex={1}>
      <Text>Teste</Text>
      <FlatList
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
            <Text>Oi</Text>
          </>
        )}
      />
    </VStack>
  );
}
