const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }
}, { timestamps: true });
const Note = mongoose.model('Note', NoteSchema);
// Create a Note
const createNote = (title, content) => {
    const note = new Note({ title: title, content: content });
    // Save Note in the database
    return note.save()

};
// find all notes
const findAllNotes = () => {
    return Note.find().populate('userId');
}
// query to find a single note
const findNote = (userId,findId, callback) => {
    Note.findOne({userId:userId,findId:findId}, (error, data) => {
        return (error) ? callback(error) : callback(data);
    })
}
// Find note and update it with the request body
const updateNote = (userid,findId, title, content) => {
    return Note.findOneAndUpdate({userId:userid,findId:findId}, {
        title: title,
        content: content
    }, { new: true }).then((result) => {
        console.log("model this");
        return result;
    }).catch((err) => {
        console.log("catch model");
        return err
    })
}
// query to delete a note
const deleteById = (findId) => {
    return Note.findByIdAndRemove(findId)
}
module.exports = {
    createNote,
    findAllNotes,
    findNote,
    updateNote,
    deleteById
}