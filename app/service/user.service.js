/**
 * @description:handles request and response for user
 * @file:user.service.js
 * @author:Shrivya Shetty
 * @since:01-12-2021
 */


const {
  createUser,
  findAllUsers,
  findUser,
  updateUser,
  deleteById,
  loginUser,
  registerUser, forgotPassword, reset
} = require('../models/user.model');
const mailHelper = require("../utility/nodemailer");
const bcrypt = require('bcrypt');
const jwtHelper = require("../utility/auth");
const { createEmail } = require("../utility/nodemailer");
/**
 * @description handles request and response for creating user
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
        var token = jwtHelper.generateToken(data._id);
        console.log(token);
        var result = data + "Token:" + token;
        return callback(null, token);
      }
      else {
        return callback("password mismatch");

      }
    }
  });
};
/**
 * @description handles request for forgot password
 * @param email
 */

const forgot = (email) => {
  return forgotPassword(email)
    .then((data) => {
      return mailHelper
        .mailer(data.email, data.resetPasswordToken)
        .then((data) => {
          console.log(data);
          return data;
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
/**
 * @param token
 * @param passsword
 * @description handles request for reset pasword
 * */

resetPass = (token, password) => {
  return reset(token, password)
    .then(data => {

      return data;

    })
    .catch(err => {
      console.log("hii");
      throw err;
    })
}


/**
 * @description handles request for registr new user
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
 * @description gets all users
 * @returns detais from database
 */

const getUsers = () => {
  return findAllUsers()
}
/**
 * @description fetches information about a user
 * @param {*} findId 
 * @param {*} callback 
 * @returns callback
 */

const getUser = (findId) => {
  return findUser(findId)
}
/**
 * @description handles request for updating user details
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

/**
 * @description handles request for deleting users
 * @param {*} findId 
 * @returns 
 */
const deleteUser = (findId) => {
  return deleteById(findId)
}

module.exports = { createNewUser, getUsers, getUser, updateUserId, deleteUser, loginNewUser, registerNewUser, forgot, resetPass }