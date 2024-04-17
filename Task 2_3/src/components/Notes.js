import React, { useContext, useEffect, useState, useRef } from "react";
import NoteContext from "../context/Notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function Notes(props) {
  const context = useContext(NoteContext);

  let { notes, editNote } = context;

  const ref = useRef(null);
  const closeRef = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currNote) => {
    ref.current.click();
    setNote({
      id: currNote.id,
      etitle: currNote.title,
      edescription: currNote.description,
      etag: currNote.tags,
    });
  };
  useEffect(() => {
    let { getNote } = context;

    getNote();
    // eslint-disable-next-line
  }, []);

  const handleOnClick = (e) => {
    e.preventDefault();

    editNote(note.id, note.etitle, note.edescription, note.etag);
    closeRef.current.click();
    props.showAlert("Updated Successfully", "success");
  };

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleOnClick(e);
    }
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch modal
      </button>

      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Enter Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={handleOnChange}
                    value={note.etitle}
                    onKeyDown={handleKeyPress}
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
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={handleOnChange}
                    onKeyDown={handleKeyPress}
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
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={handleOnChange}
                    onKeyDown={handleKeyPress}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={closeRef}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 10
                }
                onClick={handleOnClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3" style={{ paddingBottom: 60 }}>
        <h1 className="text-center mt-1 my-3">Your Notes</h1>
        <div className="container mx-2  mt-3 fs-6">
          {notes.length === 0 && "No Notes to display"}
        </div>

        {notes.map((note) => {
          return (
            <NoteItem
              key={note.id}
              showAlert={props.showAlert}
              updateNote={() => updateNote(note)}
              notes={note}
            />
          );
        })}
      </div>
    </>
  );
}
