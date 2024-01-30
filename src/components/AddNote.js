import React, { useContext, useState } from 'react'
import noteContext from './Context/notes/notecontext';


const AddNote = () => {

    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({ Title: "", Description: " ", tag: "" })

    const handleaddNote = (e) => {
        e.preventDefault();
        addNote(note)
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
                        <input type="text" className="form-control" id="Title" name="Title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label" >Description</label>
                        <input type="text" className="form-control" id="Description" name="Description" onChange={onChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleaddNote}>Submit</button>
                </form>
             </div>
        </div>
    )
}

export default AddNote
