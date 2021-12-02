/**
 * @description:handles routes for requests
 * @file:user.route.js
 * @author:Shrivya Shetty
 * @since:01-12-2021
 */
const express = require('express')
const router = express.Router()
const notes = require('../controller/note/note.controller');
const validation = require('../middleware/note.middleware.js')
// Create a new Note
router.post('/', validation.upload.single('profileImg'), validation.validate, validation.ensureToken, notes.create);
// Retrieve all Notes
router.get('/', validation.ensureToken, notes.findAll);
// Retrieve a single Note with noteId
router.get('/:noteId', validation.ensureToken, notes.findOne);
// Update a Note with noteId
router.put('/:noteId', validation.upload.single('profileImg'), validation.validate, validation.ensureToken, notes.update);
// Delete a Note with noteId
router.delete('/:noteId', validation.ensureToken, notes.delete);
module.exports = router