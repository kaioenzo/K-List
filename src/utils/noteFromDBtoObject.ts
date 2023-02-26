import { Note } from "../models/Note";
import { NotePropsFromDB } from "../types";

export function notesFromDbToObject(notes: NotePropsFromDB[]): Note[] {
  const noteProps: Note[] = [];
  notes.forEach((note) => {
    noteProps.push(
      new Note(
        note.id,
        note.title,
        note.date,
        note.hour,
        note.description,
        note.category,
        note.done,
        note.notify
      )
    );
  });
  return noteProps;
}
export function noteFromDbToObject(note: NotePropsFromDB): Note {
  return new Note(
    note.id,
    note.title,
    note.date,
    note.hour,
    note.description,
    note.category,
    note.done,
    note.notify
  );
}
