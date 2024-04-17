import React, { useState } from "react";
import { useContext } from "react";
import NoteContext from "../context/Notes/noteContext";

const AddNote = (props) => {
  let context = useContext(NoteContext);
  let { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleOnClick = (event) => {
    addNote(note.title, note.description, note.tag);
    
    setNote({ title: "", description: "", tag: "" });
    event.preventDefault();
    props.showAlert("Added new note", "success");
  };

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container">
        <h1 className="text-center">Add a Note</h1>

        <form className="my-3" onSubmit={handleOnClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={handleOnChange}
              value={note.title}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={handleOnChange}
              minLength={10}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={handleOnChange}
            />
          </div>

          <button type="submit" className="btn btn-primary my-3">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
