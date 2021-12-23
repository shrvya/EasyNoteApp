/**
 * @description:handles routes for requests
 * @file:user.route.js
 * @author:Shrivya Shetty
 * @since:01-12-2021
 */
const express = require('express')
const router = express.Router()
const users = require('../controller/user/user.controller');
const cors = require('cors');
const { userValidationRules, validate } = require('../middleware/user.middleware');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
// create a user
router.post('/', cors(corsOptions), userValidationRules(), validate, users.create);
// get all users
router.get('/', users.findAll);
// get a user using userId
router.get('/:userId', users.findOne);
// update a user
router.put('/:userId', userValidationRules(), validate, users.update);
// delete a user
router.delete('/:userId', users.delete);
//  user login
router.post("/login", users.loginUser);
//  forgot password
router.post("/forgot", users.forgotPassword);
//  reset login credentials
router.post("/reset/:token", users.resetPassword);
//  user registration
router.post("/register/:token", userValidationRules(), validate, users.registerUser);
module.exports = router

