import { NoteProps, NotePropsFromDB } from "../types";
import { db } from "./SQLite";
export function deleteTable() {
  db.transaction((transaction) => {
    transaction.executeSql("DROP TABLE IF EXISTS Notas;");
  });
}

export function createTable() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "Notas " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, date TEXT, description TEXT, category TEXT, done TEXT, notify TEXT);"
    );
  });
}

export async function addNote(note: NoteProps) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO Notas (title, date, description, category, done, notify) VALUES (?, ?, ?, ?, ?, ?);",
        [
          note.title,
          note.date,
          note.description,
          note.category,
          `FALSE`,
          `FALSE`,
        ],
        () => {
          //A função resolve termina a promise.
          resolve("Nota adicionada com sucesso");
        }
      );
    });
  });
}

export async function setDoneState(done: boolean, id: number) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE Notas SET done = ? WHERE id = ?;",
        [done ? `TRUE` : `FALSE`, id],
        () => {
          //A função resolve termina a promise.
          resolve("Nota atualizada com sucesso");
        }
      );
    });
  });
}

export async function showNotes() {
  return new Promise<NotePropsFromDB[]>((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM Notas;",
        [],
        (_transaction, resultado) => {
          //A função resolve termina a promise e retorna o resultado.
          resolve(resultado.rows._array);
        }
      );
    });
  });
}
