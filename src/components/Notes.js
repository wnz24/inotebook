import React, { useContext, useRef } from 'react'

import noteContext from './Context/notes/notecontext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useEffect, useState } from 'react';


const Notes = () => {
  const { notes, getNotes, editNote } = useContext(noteContext);
 useEffect(() => {
    getNotes();
    //es-lint-disable-new-line
  }, []);


  const ref = useRef(null);
  const refclose = useRef(null);
  
   const [note, setNote] = useState({ id:" ", eTitle: " ", eDescription: " ", etag: "" })


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id ,eTitle: currentNote.Title, eDescription: currentNote.Description, etag: currentNote.tag });
  }
 



  const handleClick = (e) => {
  editNote(note.id, note.eTitle, note.eDescription, note.etag)
    refclose.current.click();
    e.preventDefault();
    setNote()

  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none " data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 my-5">
                  <label htmlFor="eTitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="eTitle" name='eTitle' value={note.eTitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="eDescription" className="form-label" >Description</label>
                  <input type="text" className="form-control" id="eDescription" value={note.eDescription} name="eDescription" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="eTag" className="form-label" >Tag</label>
                  <input type="text" className="form-control" id="eTag" value={note.etag} name="etag" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button  ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        }
        )}
      </div>
    </div>
  )
}

export default Notes
