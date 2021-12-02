/**
 * @description:handles routes for requests
 * @file:label.route.js
 * @author:Shrivya Shetty
 * @since:01-12-2021
 */
const express = require('express')
const routerLabel = express.Router() // middleware creates route handler
const labelcontroller = require('../controller/label/label.controller');
// Create a new Note
routerLabel.post('/', labelcontroller.create);
routerLabel.get('/', labelcontroller.findAll);

routerLabel.get('/:labelId', labelcontroller.findAll);
// Update a Note with noteId
routerLabel.put('/:labelId', labelcontroller.update);
// Delete a Note with noteId
routerLabel.delete('/:labelId', labelcontroller.delete);
module.exports = routerLabel