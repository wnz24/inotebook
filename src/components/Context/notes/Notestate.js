import React, { useState } from 'react';
import Notecontext from "./notecontext";

const host = "http://localhost:5000";
const notesInitial = [

];

const Notestate = (props) => {

    const [notes, setNotes] = useState(notesInitial);

    // Get all notes
    const getNotes = async () => {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjY2NkNzVlNGZlYmZlNDAwMjUwNzk0In0sImlhdCI6MTcwNzkyMDc1N30.lmguP1l_hOMSSZ3DLpk3zssygBgQCGw9EpzkFDB2VbU"
            },
        });
        const json = await response.json();
        setNotes(json);
    };

    // Add a note
    const addNote = async (Title, Description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjY2NkNzVlNGZlYmZlNDAwMjUwNzk0In0sImlhdCI6MTcwNzkyMDc1N30.lmguP1l_hOMSSZ3DLpk3zssygBgQCGw9EpzkFDB2VbU"
            },
            body: JSON.stringify({ Title, Description, tag }),
        });
        const note = await response.json();
        setNotes(notes.concat(note))
        
    };

    // Delete a note
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjY2NkNzVlNGZlYmZlNDAwMjUwNzk0In0sImlhdCI6MTcwNzkyMDc1N30.lmguP1l_hOMSSZ3DLpk3zssygBgQCGw9EpzkFDB2VbU"
            },
        });
        const json = await response.json();
        console.log(json);

        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    };

    // Edit a note
    const editNote = async (id, Title, Description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjY2NkNzVlNGZlYmZlNDAwMjUwNzk0In0sImlhdCI6MTcwNzkyMDc1N30.lmguP1l_hOMSSZ3DLpk3zssygBgQCGw9EpzkFDB2VbU"
            },
            body: JSON.stringify({ id, Title, Description, tag }),
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
    

        //logic to edit in client
        let editedNotes = JSON.parse(JSON.stringify(notes)); //
        for (let index = 0; index < editedNotes.length; index++) {
            const element = editedNotes[index];
             if (element._id === id) {
                editedNotes[index].Title = Title;
                editedNotes[index].Description= Description;
                editedNotes[index].tag= tag;
                     break;
                };
               
 }
            setNotes(editedNotes);
    }
        
    

    return (
        <div>
            <Notecontext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
                {props.children}
            </Notecontext.Provider>
        </div>
    );

};

export default Notestate;
