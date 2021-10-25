
const {
  createUser,
  findAllUsers,
  findUser,
  updateUser,
  deleteById,
  loginUser,
  registerUser, forgotUser
} = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwtHelper = require("../utility/auth");
const { createEmail } = require("../utility/nodemailer");
/**
 * 
 * @param {*} body 
 * @param {*} callback
 * @returns callback 
 */
const loginNewUser = (body, callback) => {
  loginUser(body, (err, data) => {
    if (err) {
      return callback(err, null);
    } else {
      if (bcrypt.compareSync(body.password, data.password)) {
        var token = jwtHelper.generateToken(body.email);
        var result = data + "Token:" + token;

        return callback(null, result);
      }
      else {
        return callback("password mismatch");

      }
    }
  });
};
const forgotPassword = (mail) => {
  return forgotUser(mail);
}


const resetPass = (token, password) => {
  return reset(token, password)
    .then(data => {
      return data;
    })
    .catch(err => {
      throw err;
    })
}
/**
 * 
 * @param {*} body 
 * @param {*} callback 
 * @returns callback
 */
const registerNewUser = (body, callback) => {
  registerUser(body, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};
/**
 * 
 * @param {*} firstname 
 * @param {*} lastname 
 * @param {*} age 
 * @param {*} email 
 * @param {*} passsword 
 * @returns user details
 */
const createNewUser = (userdetails) => {
  return createUser(userdetails);
}
/**
 * 
 * @returns detais from database
 */

const getUsers = () => {
  return findAllUsers()
}
/**
 * 
 * @param {*} findId 
 * @param {*} callback 
 * @returns callback
 */

const getUser = (findId) => {
  return findUser(findId)
}
/**
 * 
 * @param {*} findId 
 * @param {*} firstname 
 * @param {*} lastname 
 * @param {*} age 
 * @param {*} email 
 * @param {*} passsword 
 * @returns updated user data
 */
const updateUserId = (findId, firstname, lastname, age, email, passsword) => {
  return updateUser(findId, { firstname: firstname, lastname: lastname, age: age, email: email, passsword: passsword }, { new: true })
}

//query to delete a note
const deleteUser = (findId) => {
  return deleteById(findId)
}

module.exports = { createNewUser, getUsers, getUser, updateUserId, deleteUser, loginNewUser, registerNewUser, forgotPassword, resetPass }