import React, { useContext, useState } from 'react'
import noteContext from './Context/notes/notecontext';


const AddNote = () => {

    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({ Title: "", Description: " ", tag: "" })

    const handleaddNote = (e) => {
        e.preventDefault();
        addNote(note.Title, note.Description, note.tag);
        setNote({ Title: "", Description: " ", tag: "" })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div>
                <form>
                    <h2 className='my-4'>Add a new Note</h2>
                    <div className="mb-3 my-5">
                        <label htmlFor="Title" className="form-label">Title</label>
                        <input type="text" className="form-control" value={note.Title} id="Title" name="Title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label" >Description</label>
                        <input type="text" className="form-control"value={note.Description}  id="Description" name="Description" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" >Tag</label>
                        <input type="text" className="form-control"value={note.tag}  id="tag" name="tag" onChange={onChange} />
                    </div>
                   
                    <button type="submit" className="btn btn-primary" onClick={handleaddNote}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
