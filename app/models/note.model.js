/**
 * @description:handles routes for requests
 * @file:note.model.js
 * @author:Shrivya Shetty
 * @since:01-12-2021
 */
const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isTrash: Boolean,
    color: String,
    profileImg:
        { type: String }

}, { timestamps: true });
const Note = mongoose.model('Note', NoteSchema);
/**
 * @description Query to create a note 
 * @param {*} title 
 * @param {*} content 
 * @param {*} userId 
 * @param {*} filename 
 * @returns 
 */
const createNote = (title, content, userId, filename) => {
    const note = new Note({ title: title, content: content, userId: userId, isTrash: false, color: "White", profileImg: filename });

    return note.save()

};
/**
 * @description  Query to find  all note
 * @param {*} userId 
 * @returns 
 */
const findAllNotes = (userId) => {
    return Note.find({ userId: userId }).populate({
        path: "userId",
        select: ["firstname", "lastname", "email"]
    });
}
/**
 * @description Query to find a note
 * @param {*} userId 
 * @param {*} findId 
 * @returns 
 */
const findNote = (userId, findId) => {
    return Note.findById({ userId: userId, _id: findId })
}
/**
 * @description Query to upadte a note
 * @param {*} userId 
 * @param {*} findId 
 * @param {*} title 
 * @param {*} content 
 * @param {*} isTrash 
 * @param {*} color 
 * @param {*} filename 
 * @returns 
 */
const updateNote = (userId, findId, title, content, isTrash, color, filename) => {
    console.log(color);
    return Note.findOneAndUpdate({
        userId: userId,
        _id: findId
    },
        {
            title: title,
            content: content,
            isTrash: isTrash,
            color: color,
            profileImg: filename
        }, { new: true })
}

/**
 * @description Query to delete a note
 * @param {*} userId 
 * @param {*} findId 
 * @returns 
 */
const deleteById = (userId, findId) => {
    return Note.findByIdAndRemove({ userId: userId, _id: findId })
}
module.exports = {
    createNote,
    findAllNotes,
    findNote,
    updateNote,
    deleteById
}