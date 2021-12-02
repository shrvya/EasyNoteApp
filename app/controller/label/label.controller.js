/**
 * @description:handles request and response for labels
 * @file:label.controller.js
 * @author:Shrivya Shetty
 * @since:01-12-2021
 */
const { log } = require('../../../utils/logger.js');
const logger = require('../../../utils/logger.js');
const {
    createNewLabel,
    getAllLabels,
    updateLabelId,
    deleteLabel,
} = require('../../service/label.service')

/**
  * @description handles request response for creating a label
  * @param {Object} req
  * @param {Object} res
  */

exports.create = async (req, res) => {
    try {
        const data = await createNewLabel(req.body.labelname);
        return res.send(data)
    } catch (err) {
        logger.error(err)
        return res.send(err)
    }
}
/**
   * @description handles request response for retrieving all labels from the database.
   * @param {Object} req
   * @param {Object} res
   */
exports.findAll = async (req, res) => {
    try {
        const data = await getAllLabels();
        return res.send(data)
    } catch (err) {
        logger.error(err)
        return res.send(err)
    }
};
/**
  * @description handles request response for updating a label 
  * @param {Object} req
  * @param {Object} res
  */
exports.update = async (req, res) => { // Find note and update it with the request body
    try {
        const data = await updateLabelId(req.params.labelId, req.body.labelname);
        return res.send(data)
    } catch (err) {
        logger.error(err)
        return res.send(err)
    }
};
/**
 * @description handles request response for deleting a labelwith particular labelId in the request
 * @param {Object} req
 * @param {Object} res
 */
exports.delete = async (req, res) => {
    try {
        const data = await deleteLabel(req.params.labelId);
        return res.send({ message: "label deleted successfully!" })
    } catch (err) {
        logger.error(err)
        return res.send(err)
    }
};
