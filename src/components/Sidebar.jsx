import React from "react";
import { IoMdAdd, IoMdTrash } from "react-icons/io";

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id} className='note-item'>
      {/* note title */}
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className='text-snippet'>
          {note.body.split("\n")[0] || "Note " + (index + 1)}
        </h4>
      </div>

      {/* delete button */}
      <button className='delete-note' onClick={() => props.onDelete(note.id)}>
        <IoMdTrash />
      </button>
    </div>
  ));

  return (
    <section className='pane sidebar'>
      {/* Title */}
      <div className='sidebar--header'>
        <h2>Notes</h2>
        <button className='new-note' onClick={props.newNote}>
          <IoMdAdd />
        </button>
      </div>

      {/* All Note Elements */}
      {noteElements}
    </section>
  );
}
