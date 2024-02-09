import React, { useContext} from 'react'

import noteContext from './Context/notes/notecontext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useEffect } from 'react';


const Notes = () => {
  const { notes,getNotes} = useContext(noteContext);
  useEffect(() => {
     getNotes();
  }, []);
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
