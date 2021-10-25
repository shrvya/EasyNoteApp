const express = require('express')
const router = express.Router() // middleware creates route handler
const notes = require('../controller/note.controller.js');
const validation = require('../middleware/note.middleware.js')
// Create a new Note
router.post('/', validation.validate,validation.ensureToken, notes.create);
// Retrieve all Notes
router.get('/',validation.ensureToken, notes.findAll);
// Retrieve a single Note with noteId
router.get('/:noteId',validation.ensureToken, notes.findOne);
// Update a Note with noteId
router.put('/:noteId', validation.validate,validation.ensureToken, notes.update);
// Delete a Note with noteId
router.delete('/:noteId', validation.ensureToken,notes.delete);
module.exports = router