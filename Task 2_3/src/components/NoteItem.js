import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/Notes/noteContext';

export default function NoteItem(props) {
const note=props.notes;
let context=useContext(NoteContext);
let {deleteNote}=context
const {updateNote}=props

function formatDate(dateString) {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}
  return (
    <div className='col-md-3 my-3'>
     <div className="card" >
  <div className="card-body">
    <h3 className="card-title fs-3">{note.title}</h3>
    <p className="card-text my-2 fs-5">{note.description}</p>
    <p className="card-text text-xs">Added on: {formatDate(note.date)}</p>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note.id);
    props.showAlert("Note Deleted", "success")}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNote(note)}></i>

  </div>
</div>
    </div>
  )
}
