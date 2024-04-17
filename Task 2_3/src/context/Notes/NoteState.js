import { useState } from "react";
import NoteContext from "./noteContext";



const NoteState = (props) => {
    const host = "http://localhost:3003";
  let notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //GEt all Note
  const getNote = async () => {
   

    const response = await fetch(host+`/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      
      },
    });
    const json = await response.json();

    setNotes(json);
  };
  //Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(host+`/api/notes/addnew`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json=await response.json();

    let note = {
      id: json.note,
  
      title: title,
      description: description,
      tag: tag,
      date: "2023-05-03T13:57:05.061Z",

    };
    setNotes(notes.concat(note));
  };

  //Delete Note
  const deleteNote = async (id) => {

   
    const response = await fetch(host+`/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
     
      },
      
    });
   await response.json();


    let newNotes = notes.filter((note) => {
      return note.id !== id;
    });
    setNotes(newNotes);
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {

   
   await fetch(host+`/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify({ title, description, tag }),
    });
 
    let newNote=JSON.parse(JSON.stringify(notes))
    for (let idx = 0; idx < notes.length; idx++) {
      const element = newNote[idx];
      if (element.id === id) {
        newNote[idx].title = title;
        newNote[idx].description = description;
        newNote[idx].tag = tag;
        break;
      }
    }

    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
