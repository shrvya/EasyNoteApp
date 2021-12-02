/**
 * @description:handles routes for requests
 * @file:label.model.js
 * @author:Shrivya Shetty
 * @since:01-12-2021
 */
const mongoose = require('mongoose');

const NotelabelSchema = mongoose.Schema({
 
  labelname:{
    type: String
  }
},
 { timestamps: true });

const Notelabel = mongoose.model('Notelabel',NotelabelSchema);


/**
   * @description Query to create a label
      */
const createLabel = (labelname) => {
  
  const label = new Notelabel({labelname: labelname})
  return label.save()
}
/**
 * @description Query to find all label
 * @returns 
 */
const findAllLabels = () => {
  return Notelabel.find()
}
/**
 * @description Query to update a label
 * @param {*} findId 
 * @param {*} labelName 
 * @returns 
 */
const updateLabel = (findId,labelName) => {
 
  return Notelabel.findOneAndUpdate({
    
      _id:findId},
       {
     labelname:labelName
  }, { new: true })
}

/**
 * @description Query to delete a label
 * @param {*} findId 
 * @returns 
 */
const deleteById = (findId) => {
  return Notelabel.findByIdAndRemove(findId)
}
module.exports={
    createLabel,
    findAllLabels,
    deleteById,
    updateLabel

}
