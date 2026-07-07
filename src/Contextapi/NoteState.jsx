import { createContext, useContext, useState } from "react";
import { BASEURLS } from "../BaseUrls";
import { errorEmitter, successEmitter } from "../Toastify.Emmiter";

export const noteContext = createContext(null);

function NoteState({ children }) {
  const [notes, setNotes] = useState([]);

  const getPublicNote = async () => {
    try {
      const res = await fetch(`${BASEURLS}/note/public`);
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setNotes(data.note);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getYourNote = async () => {
    try {
      const res = await fetch(`${BASEURLS}/note/yournotes`, {
        method: "GET",
        headers: {
          "token": localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (data.success) {
        setNotes(data.note);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateNote = async (note, noteId, setOpen) => {
    try {
      const res = await fetch(`${BASEURLS}/note/update/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      });
      const data = await res.json();

      if (data.success) {
        successEmitter(data.message);
        setOpen(false);
        setNotes((prevNote) =>
          prevNote.map((elm) => (elm._id == noteId ? data.note : elm)),
        );
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <noteContext.Provider value={{ notes, getPublicNote, getYourNote, updateNote }}>
      {children}
    </noteContext.Provider>
  );
}

export default NoteState;

export const useNoteState = () => useContext(noteContext);
