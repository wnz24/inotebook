const mongoose = require('mongoose') ;
const { Schema } = mongoose;

const NotesSchema = new Schema({
    User:{
     type: mongoose.Schema.Types.ObjectId,
     ref:'user'
    
    },
    Title: {
        type: String,
        required: true,

    },
    Description: {
        type: String,
        required: true,

    },
    tag: {
        type: String,
        default: "general"
    },
    Date: {
        type: Date,
        default: Date.now

    }
}
);
module.exports = mongoose.model('notes', NoteSchema);