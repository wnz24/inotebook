import React, { useContext, useRef } from 'react'

import noteContext from './Context/notes/notecontext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useEffect, useState } from 'react';


const Notes = () => {
  const { notes, getNotes } = useContext(noteContext);
  const [note, setNote] = useState({ eTitle: "",eDescription: " ", etag: "" })
 

  useEffect(() => {
    getNotes();
  }, []);
    const ref = useRef(null);

  const updatenote = (currentnote) => {
    ref.current.click();
    setNote({eTitle: currentnote.Title, eDescription: currentnote.Description, etag: currentnote.tag});
  }

  

  const handleaddNote = (e) => {
    e.preventDefault();
    
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
                <h2 className='my-4'>Add a new Note</h2>
                <div className="mb-3 my-5">
                  <label htmlFor="eTitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="eTitle" name="eTitle" value = {note.Title} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="eDescription" className="form-label" >Description</label>
                  <input type="text" className="form-control" id="eDescription"  value = {note.Description}  name="Description" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label" >Tag</label>
                  <input type="text" className="form-control" id="eTag"  value = {note.tag}  name="etag" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleaddNote} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} updatenote={updatenote} note={note} />
        }
        )}
      </div>
    </div>
  )
}

export default Notes
