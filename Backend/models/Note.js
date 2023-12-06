const mongoose = require('mongoose') ;
const { Schema } = mongoose;
const user = require('./User');

const NotesSchema = new Schema({
    user:{
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
module.exports = mongoose.model('notes', NotesSchema);