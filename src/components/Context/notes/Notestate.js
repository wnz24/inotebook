import React, { useState } from 'react'

import Notecontext from "./notecontext";


const Notestate = (props) => {
    const notesInitial = [

        {
            "_id": "656d6ac2842b6bb019d50fe2",
            "user": "656ad0bd6575b5fc4bf59a1f",
            "Title": "My new  Note",
            "Description": "Hello this is my First Note",
            "tag": "Hello123",
            "Date": "2023-12-04T05:59:30.955Z",
            "__v": 0
        },
        {
            "_id": "656d6b6f6323626c77dba570",
            "user": "656ad0bd6575b5fc4bf59a1f",
            "Title": "My new  Note",
            "Description": "Hello this is my First Note",
            "tag": "Hello123",
            "Date": "2023-12-04T06:02:24.000Z",
            "__v": 0
        },
        {
            "_id": "656d6b99c72eb7975291aa5d",
            "user": "656ad0bd6575b5fc4bf59a1f",
            "Title": "My new  Note",
            "Description": "Hello this is my First Note",
            "tag": "Hello123",
            "Date": "2023-12-04T06:03:05.364Z",
            "__v": 0
        },
        {
            "_id": "65ab731217cc012e66495e39",
            "user": "656ad0bd6575b5fc4bf59a1f",
            "Title": "My new  Note",
            "Description": "Hello this is my First Note",
            "tag": "Hello123",
            "Date": "2024-01-20T07:15:30.092Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    // Add a note
    const addNote = (Title, Description, tag) => {
        console.log("addin a new note");
        const note = {
            "_id": "65ab731217cc012e66495e39",
            "user": "656ad0bd6575b5fc4cf59a1f",
            "Title": Title,
            "Description": Description,
            "tag": tag,
            "Date": "2024-01-20T07:15:30.092Z",
            "__v": 0
        }
        setNotes(notes.concat(note))


    }
    // Delete a note
    const deleteNote = (id) => {
        console.log("delte Note with id" + id)
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    // Edit a note
    const editNote = () => {

    }
    return (
        <div>
            <Notecontext.Provider value={{ notes, setNotes, addNote, deleteNote }}>
                {props.children}
            </Notecontext.Provider>
        </div>
    );
}

export default Notestate;
