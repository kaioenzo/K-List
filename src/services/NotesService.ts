import { Note } from "../models/Note";
import { NoteProps, NotePropsFromDB } from "../types";
import { db } from "./SQLite";

export function deleteTable() {
  db.transaction((transaction) => {
    transaction.executeSql("DROP TABLE IF EXISTS Notas;");
  });
}

export async function createTable() {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Notas (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT, date TEXT NOT NULL, hour TEXT NOT NULL, category TEXT NOT NULL, done TEXTO NOT NULL, notify TEXT NOT NULL );",
        [],
        () => {
          console.log("Table created successfully");
          resolve();
        },
        (_, error) => {
          console.log("Error creating table", error);
          reject(error);
          return false;
        }
      );
    });
  });
}

export async function addNote(note: NoteProps) {
  return new Promise<Note>((resolve) => {
    db.transaction(
      (transaction) => {
        transaction.executeSql(
          "INSERT INTO Notas (title, description, date, hour, category, done, notify) VALUES (?, ?, ?, ?, ?, ?, ?);",
          [
            note.title,
            note.description,
            note.date,
            note.hour,
            note.category,
            `FALSE`,
            note.notify ? `TRUE` : `FALSE`,
          ],
          (_, resultSet) => {
            //A função resolve termina a promise.
            console.log(`Nota: ${note.title} inserted with sucessfully\n`);
            console.log(resultSet);
            resolve(
              new Note(
                resultSet.insertId!,
                note.title,
                note.date,
                note.hour,
                note.description,
                note.category,
                "FALSE",
                note.notify ? `TRUE` : `FALSE`
              )
            );
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  });
}

export async function setDone(done: boolean, id: number) {
  return new Promise<void>((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE Notas SET done = ? WHERE id = ?;",
        [done ? `TRUE` : `FALSE`, id],
        (_, resultSet) => {
          console.log(`Nota: ${id} update succesfully\n`);
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
          console.log(resultado.rows._array);
          resolve(resultado.rows._array);
        }
      );
    });
  });
}
export async function deleteNoteById(id: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM Notas WHERE id = ?;",
          [id],
          (_, resultSet) => {
            console.log(`Note with id: ${id} deleted successfull`);
            resolve();
          }
        );
      },
      (error) => {
        console.log("Error deleting note", error);
        reject(error);
      }
    );
  });
}
export async function clearDataBase() {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM TABLE Notas;", [], () => {
      console.log("Table dropped successfully");
    });
  });
}
