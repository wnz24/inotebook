import React, { useContext } from 'react'
import noteContext from './Context/notes/notecontext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';


const Notes = () => {
  const { notes, setNotes } = useContext(noteContext);

  return (
    <div>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />
        }
        )}
      </div>
    </div>
  )
}

export default Notes
