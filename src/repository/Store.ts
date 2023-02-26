import { create } from "zustand";
import { Note } from "../models/Note";
import {
  clearDataBase,
  deleteNoteById,
  setDone,
  showNotes
} from "../services/NotesService";
import { notesFromDbToObject } from "../utils/noteFromDBtoObject";

interface NoteState {
  toDos: Note[] | null;
  add: (newNote: Note) => void;
  addAll: (newNotes: Note[]) => void;
  startStat: () => void;
  clearAll: () => void;
  deleteNote: (id: number) => void;
  setNoteDone: (id: number) => void;
}

export const useNoteStore = create<NoteState>()((set, get) => ({
  toDos: null,
  add: (newNote: Note) => {
    console.log("adicionando nota", newNote.title);
    set((state) => ({ toDos: [...(state.toDos ?? []), newNote] }));
  },
  addAll: (newNote: Note[]) =>
    set((state) => ({ ...state, toDos: [...(state.toDos ?? []), ...newNote] })),
  startStat: async () => {
    const data = await showNotes();
    const notes = notesFromDbToObject(data);
    set((state) => ({ ...state, toDos: notes }));
    console.log("updated state:", get());
  },
  clearAll: async () => {
    await clearDataBase();
    set({ toDos: null });
  },
  deleteNote: async (id: number) => {
    await deleteNoteById(id);
    set((state) => ({
      toDos: state.toDos?.filter((note) => note.id !== id) ?? null,
    }));
  },
  setNoteDone: async (id: number) => {
    const note = get().toDos?.find((note) => note.id === id);
    console.log(id);
    setDone(!note?.done, id);
    set((state) => ({
      toDos:
        state.toDos?.map((note) => {
          if (note.id === id) {
            console.log(`updating done of ${note.title} to ${!note.done}`);
            return { ...note, done: !note.done };
          }
          return note;
        }) ?? null,
    }));
  },
}));
