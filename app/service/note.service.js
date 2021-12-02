/**
 * @description:handles request and response for notes
 * @file:note.service.js
 * @author:Shrivya Shetty
 * @since:01-12-2021
 */
const { createNote, findAllNotes, findNote, updateNote, deleteById } = require('../models/note.model.js');

/**
   * @description Handles the request and response for creating a note
   * @param {Object} req
   * @param {Object} res
   */
const createNewNote = (title, content, userId, filename) => {

    let note = createNote(title, content, userId, filename)
    return note
}

/**
   * @description Handles the request and response for retrieveing  all note
   * @param {Object} req
   * @param {Object} res
   */
const getNotes = (userId) => {
    return findAllNotes(userId)
}

/**
   * @description Handles the request and response for retrieving a note
   * @param {Object} req
   * @param {Object} res
   */
const getNote = (userId, findId, callback) => {
    findNote(userId, findId, (error, data) => {
        return (error) ? callback(error) : callback(data);
    })
}

/**
   * @description Handles the request and response for updating a note
   * @param {Object} req
   * @param {Object} res
   */
const updateNoteId = (userId, findId, title, content, isTrash, color, filename) => {

    return updateNote(userId, findId, title, content, isTrash, color, filename)
}

/**
   * @description Handles the request and response for deleting a note
   * @param {Object} req
   * @param {Object} res
   */
const deleteNote = (userId, findId) => {
    return deleteById(userId, findId)
}

module.exports = { createNewNote, getNotes, getNote, updateNoteId, deleteNote }