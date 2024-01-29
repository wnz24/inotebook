import React , { useContext } from 'react'
import noteContext from './Context/notes/notecontext';
import Noteitem from './Noteitem';


const Notes = () => {
    const  { notes, setNotes } = useContext(noteContext);

  return (
    <div>
       <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem note={note}/>
        }
        )}
      </div>
    </div>
  )
}

export default Notes
