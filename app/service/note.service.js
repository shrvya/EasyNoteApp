//note.service.js
const { createNote, findAllNotes, findNote, updateNote, deleteById } = require('../models/note.model.js');

const createNewNote = (title, content,userId) => {
    //function call to create a new note with the given title and content
    let note = createNote(title, content,userId)
    return note
}

//query to find all notes
const getNotes = (userId) => {
    return findAllNotes(userId)
}

//query to find a single note
const getNote = (userId,findId, callback) => {
    findNote(userId,findId, (error, data) => {
        return (error) ? callback(error) : callback(data);
    })
}

// Find note and update it with the request body
const updateNoteId = (userId,findId, title, content) => {

    return updateNote(userId,findId, { title: title, content: content }, { new: true })
        .then((result) => { console.log(result); return result; })
        .catch((err) => { console.log("catch model"); return err })
}

//query to delete a note
const deleteNote = (userId,findId) => {
    return deleteById(userId,findId)
}

module.exports = { createNewNote, getNotes, getNote, updateNoteId, deleteNote }