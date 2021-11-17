const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
     userId: { 
         type: mongoose.Schema.Types.ObjectId,
          ref: "User" },
   
}, { timestamps: true });
const Note = mongoose.model('Note', NoteSchema);
// Create a Note
const createNote = (title, content,userId) => {
    const note = new Note({ title: title, content: content,userId:userId });
    // Save Note in the database
    return note.save()

};
// find all notes
const findAllNotes = (userId) => {
    return Note.find({userId:userId}).populate({
        path:"userId",
        select:["firstname","lastname","email"]
    });
}
// query to find a single note
const findNote = (userId,findId, callback) => {
    Note.findOne({userId:userId,findId:findId}, (error, data) => {
        return (error) ? callback(error) : callback(data);
    })
}
// Find note and update it with the request body
const updateNote = (userId,findId, title, content) => {
    return Note.findOneAndUpdate({userId:userId,findId:findId}, {
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
const deleteById = (userId,findId) => {
    return Note.findByIdAndRemove({userId:userId,findId:findId})
}
module.exports = {
    createNote,
    findAllNotes,
    findNote,
    updateNote,
    deleteById
}