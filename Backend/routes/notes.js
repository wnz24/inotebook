const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser.js");
const Note = require("../models/Note.js");
const { body, validationResult } = require("express-validator");

// Route1 : Get all the notes: GET request "/api/notes/fetchallnotes", no login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ User: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occurred");
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
                Title,
                Description,
                tag,
                user: req.user.id,
            });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occurred");
        }
    }
);

module.exports = router;
