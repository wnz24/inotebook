import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
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
        type: String,
        default: Date.now,

    }
}
);
module.exports = mongoose.model('notes', NotesSchema);