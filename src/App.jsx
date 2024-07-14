import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, noteCollection } from "./firebase";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [tempNoteText, setTempNoteText] = useState("");

  const currentNote =
    notes.find((note) => {
      return note.id === currentNoteId;
    }) || notes[0];

  // Sort the array by update time
  const sortedArr = notes.sort((a, b) => b.updatedAt - a.updatedAt);

  // Creating new note in firebase
  useEffect(() => {
    const subscribe = onSnapshot(noteCollection, function (snapshot) {
      const noteArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(noteArr);
    });
    return subscribe;
  }, []);

  // If no note seleted then they point to zero index
  useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]);
    }
  }, [notes]);

  // If currentNote change then tempNoteText also change
  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote]);

  // Use for to delay the response to store data in firbase
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tempNoteText !== currentNote.body) {
        updateNote(tempNoteText);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [tempNoteText]);

  // Function that create new Note
  async function createNewNote() {
    const newNote = {
      body: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newNoteRef = await addDoc(noteCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  // Function to update the Note
  async function updateNote(text) {
    const RefId = doc(db, "notes", currentNoteId);
    await setDoc(RefId, { body: text, updatedAt: Date.now() }, { merge: true });
  }

  // Function to Delete the Note
  async function deleteNote(noteId) {
    const RefId = doc(db, "notes", noteId);
    await deleteDoc(RefId);
  }

  return (
    <main>
      {notes.length > 0 ? (
        <div className='split'>
          {/* Sidebar */}
          <div className='first-child'>
            <Sidebar
              key='sidebar'
              notes={sortedArr}
              currentNote={currentNote}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              onDelete={deleteNote}
            />
          </div>

          {/* Editor */}
          <div className='last-child'>
            <Editor
              tempNoteText={tempNoteText}
              setTempNoteText={setTempNoteText}
            />
          </div>
        </div>
      ) : (
        // First time appear
        <div className='no-notes'>
          <h1>You have no notes</h1>
          <button className='first-note' onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
