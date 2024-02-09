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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjNWJhNDFlN2Y4MzcxYjAwODRlMTIyIn0sImlhdCI6MTcwNzQ1NzA4OX0.VdQ4FCuIkNz7New6wx8pCPF7VyeJF-54tPiVuio_nAY"
            },
        });
        const json = await response.json();
        console.log("getNotes() : ", json);
        console.log(json);
        setNotes(json);
    };

    // Add a note
    const addNote = async (Title, Description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2NDE2YWM2ZTFmN2Q5M2UzODkxMGNjIn0sImlhdCI6MTcwNzQ1NjgyNH0.3JkBNqLoGz_OCu1NZKBXCMyal2BBOuKX9d3TUd6r22o"
            },
            body: JSON.stringify({ Title, Description, tag }),
        });
        const json = await response.json();
        console.log(json);
        console.log("Adding a new note");
        

        const note = {
            "_id": json._id,
            "user": json.user,
            "Title": Title,
            "Description": Description,
            "tag": tag,
            "Date": json.Date,
            "__v": json.__v
        };
        setNotes([...notes, note]);
    };

    // Delete a note
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjNWJhNDFlN2Y4MzcxYjAwODRlMTIyIn0sImlhdCI6MTcwNzQ1NzA4OX0.VdQ4FCuIkNz7New6wx8pCPF7VyeJF-54tPiVuio_nAY"
            },
        });
        const json = await response.json();
        console.log(json);

        console.log("delete Note with id" + id);

        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    };

    // Edit a note
    const editNote = async (Title, Description, tag, id) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjNWIxMWU2NjRlYzIxYTZlYWZjY2U1In0sImlhdCI6MTcwNzQ1NDc1MX0.H57IXHqd_YH2T0nEqOVTdmsOAWgBAFbpQaHbW7225Dg"
            },
            body: JSON.stringify({ Title, Description, tag }),
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        //logic to edit in client
        const updatedNotes = notes.map((note) => {
            if (note._id === id) {
                return {
                    ...note,
                    Title: Title,
                    Description: Description,
                    tag: tag
                };
            }
            return note;
        });
        setNotes(updatedNotes);
    };

    return (
        <div>
            <Notecontext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
                {props.children}
            </Notecontext.Provider>
        </div>
    );

};

export default Notestate;
