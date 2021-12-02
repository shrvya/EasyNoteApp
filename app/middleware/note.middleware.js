/**
 * @description:validate title and content of notes
 * @file:note.middleware.js
 * @author:Shrivya Shetty
 * @since:01-12-2021
 */
const jwtHelper = require("../utility/auth");
multer = require('multer'),
mongoose = require('mongoose'),

 uuid = require('uuid');
 /**
  * @description handles validation of title and content
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  * @returns 
  */
  const validate = (req, res, next) => {
      if (!req.body.content) {
      return res.status(400).send({
        message: "Note content can not be empty",
      });
    }
    
    var pattern = new RegExp("^[a-zA-Z][a-zA-Z0-9]{2,}$");
    if (!pattern.test(req.body.title)) {
      return res.status(400).send({
        message:
          "Title name should begin with alphabets and can contain only alphanumeric values and should be minimum of length 3",
      });
    } else {
      next();
    }
  };

 const ensureToken = (req, res, next) => {
  
  const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwtHelper.verifyToken(token, (err, user) => {
            if (err) {
                return res.send(err);
            }
            req.body.userId = user._id;
            console.log(user._id);
            next();
        });
    } else {
        res.sendStatus(401);
    }
  
};
const DIR = 'C:/Users/Shrivya Shetty/Desktop/nodejs/node-easy-notes-app/app/public';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,uuid.v4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = {
  validate,
  ensureToken,
  upload
}