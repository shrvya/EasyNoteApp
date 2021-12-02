/**
 * @description:handles request and response for labels
 * @file:label.service.js
 * @author:Shrivya Shetty
 * @since:01-12-2021
 */
const { createLabel, findAllLabels, deleteById, updateLabel } = require('../models/label.model');

/**
   * @description Handles the request and response for creating a label
   * @param {Object} req
   * @param {Object} res
   */
const createNewLabel = (labelname) => {
    console.log("service");
    console.log(labelname);
    return createLabel(labelname);


}
/**
 * @description handles request and response for getting all  labels
 * @returns 
 */
const getAllLabels = () => {
    return findAllLabels()
}
/**
 * @description handles request and response for updating labels
 * @param {*} findId 
 * @param {*} labelname 
 * @returns 
 */
const updateLabelId = (findId, labelname) => {

    return updateLabel(findId, labelname)
}

/**
   * @description Handles the request and response for deleting a label
   * @param {Object} req
   * @param {Object} res
   */
const deleteLabel = (findId) => {
    return deleteById(findId)
}


module.exports = { createNewLabel, getAllLabels, updateLabelId, deleteLabel }