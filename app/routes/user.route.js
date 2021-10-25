const express = require('express')
const router = express.Router()
const users = require('../controller/user.controller.js');
const {userValidationRules,validate}=require('../middleware/user.middleware');
router.post('/',userValidationRules(),validate,users.create);

router.get('/', users.findAll);
router.get('/:userId', users.findOne);
router.put('/:userId', userValidationRules(),validate,users.update);
router.delete('/:userId', users.delete);

router.post("/login",users.loginUser);
router.post("/forgot",users.forgotPass);
router.post("/register/:token",userValidationRules(),validate,users.registerUser);
module.exports = router