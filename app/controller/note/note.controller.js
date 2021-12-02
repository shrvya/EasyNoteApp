
/**
 * @description:get the request, response object from note routes
 * @file:note.controller.js
 * @author:Shrivya Shetty
 * @since:01-12-2021
 */
const logger = require('../../../utils/logger');
const {
    createNewNote,
    getNotes,
    getNote,
    updateNoteId,
    deleteNote
} = require('../../service/note.service')
/**
 * @description handles request response for creating a Note and saves it
 * @param {object} req 
 * @param {object} res 
  */
exports.create = (req, res) => {
    let filename= (req.file===undefined)?(undefined):(req.file.filename)
console.log(req.params.userId);
    createNewNote(req.body.title, req.body.content,req.body.userId,filename).then(data => {
        res.send(data);
        logger.info("User created  Successful");
    }).catch(err => {
        logger.error(err.message || "Some error occurred while creating the Note.")
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."

        });
    });
};
/**
 * @description handle request to retrieve data from database
 * @param {object} req 
 * @param {object} res 
 */
exports.findAll = (req, res) => {
    getNotes(req.body.userId).then(notes => {
        res.send(notes);
        logger.info("findall notes Successful");
    }).catch(err => {
        logger.error("error 500 while retrieving data")
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    })
};
exports.saveUser = (req, res) => {
}
/**
 * @description handles request to find note by Id
 * @param {object} req 
 * @param {object} res 
 */
exports.findOne = (req, res) => {
    getNote(req.body.userId,req.params.noteId, (error, resultData) => {
        logger.error("Error retrieving note with id " + req.params.noteId)
        if (error) {
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            })
        }

        if (err.kind === 'ObjectId') {
            logger.error("note not found with id")
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(resultData);
        logger.info("find one note Successful");
    })

};
/**
 * @description handles request to update notes
 * @param {object} req 
 * @param {object} res 
 */
exports.update = (req, res) => { 
    let id = req.params.noteId
    
    let title = req.body.title
    let content = req.body.content
    let isTrash=req.body.isTrash
    let color=req.body.color
    let filename= (req.file===undefined)?(undefined):(req.file.filename)
    updateNoteId(req.body.userId,id, title, content,isTrash,color,filename).then(note => {
        logger.info("Note update Successful");
        res.send(note);
    }).catch(err => {
        console.log("catch" + err)
        if (err.kind === 'ObjectId') {
            logger.error("note not found with id")
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        logger.error("Error updating note with id " + req.params.noteId)
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};
/**
 * @description handles request delete notes
 * @param {object} req 
 * @param {object} res 
 */
exports.delete = (req, res) => {
    deleteNote(req.body.userId,req.params.noteId).then(note => {
        res.send({ message: "Note deleted successfully!" });
        logger.info("delete user Successful");
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            logger.error("Note not found with id " + req.params.noteId)
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        logger.error("Could not delete note with id " + req.params.noteId)
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId

        });
    });
};