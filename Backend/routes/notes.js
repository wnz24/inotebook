const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser.js");
const Note = require("../models/Note.js");
const { body, validationResult } = require("express-validator");



// Route1 : Get all the notes: GET request "/api/notes/fetchallnotes", no login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
       
        if (!notes || notes.length === 0) {
            console.log(notes)
            return res.status(404).json({ msg: "No notes found for this user." });
        }
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});
// Route2 : Add a new note: POST request "/api/notes/addnote", no login required

router.post(
    "/addnote",
    fetchuser,
    [
        body("Title", "Enter a valid Title").isLength({ min: 3 }),
        body("Description", "Description must be atleast 5 characters").isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const { Title, Description, tag } = req.body;
            // if there are errors return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const note = new Note({
                user: req.user.id,
                Title,
                Description,
                tag,

            });
           
            const savedNote = await note.save();
            
            res.json(savedNote);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occurred");
        }
    }
);
// Route3 : update an exsisting note: PUT request "/api/notes/updatenote",  login required
router.put(
    "/updatenote/:id", fetchuser, async (req, res) => {
        const { Title, Description, tag } = req.body;
        // Vreate a newNote object
        const newNote = {};
        if (Title) { newNote.Title = Title }
        if (Description) { newNote.Description = Description }
        if (tag) { newNote.tag = tag }
        // find the Note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        if (note.user? note.user.tostring() !== req.user.id:'') {
            return res.status(401).send("not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json({ note })


    });
// Route4 : Delete an exsisting note: PUT request "/api/notes/deletenote,login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    const { Title, Description, tag } = req.body;
    // find the Note to be Deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") };
      
    if (note.user && note.user.toString() !== req.user.id) {
       
        return res.status(401).send("not Allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ note })


});


module.exports = router;
