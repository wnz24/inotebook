import React, { useState } from 'react'

import Notecontext from "./notecontext";


const Notestate = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)


    // Get all notes
    const getNotes = async () => {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YWQwYmQ2NTc1YjVmYzRiZjU5YTFmIn0sImlhdCI6MTcwMTQ5OTA2OX0.-6jrtrLW7sFOvmD-bgSf1DhVCgJWn_igL-2G0Gd0h2M"
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }



    // Add a note
    const addNote = async (Title, Description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YWQwYmQ2NTc1YjVmYzRiZjU5YTFmIn0sImlhdCI6MTcwMTQ5OTA2OX0.-6jrtrLW7sFOvmD-bgSf1DhVCgJWn_igL-2G0Gd0h2M"
            },
            body: JSON.stringify(Title, Description, tag),
        });
        // const json = response.json();
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
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2NDE3YTg0ZjMzYjhjZWJkZjgzODJhIn0sImlhdCI6MTcwMTA1ODQ3Mn0.3mk3TebJ-gJu0iykq5csXmwToRL1E7sxL_SVmnLLBk4"
            },

        });
        const json= response.json;
        console.log(json)


        console.log("delete Note with id" + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }


    // Edit a note
    const editNote = async (Title, Description, tag, id) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2NDE3YTg0ZjMzYjhjZWJkZjgzODJhIn0sImlhdCI6MTcwMTA1ODQ3Mn0.3mk3TebJ-gJu0iykq5csXmwToRL1E7sxL_SVmnLLBk4"
            },
            body: JSON.stringify(Title, Description, tag),
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects


        //logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.Title = Title;
                element.Description = Description;
                element.tag = tag;
            }
        }
    }
    return (
        <div>
            <Notecontext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
                {props.children}
            </Notecontext.Provider>
        </div>
    );
}

export default Notestate;
