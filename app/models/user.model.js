/**
 * @description:to get the data from the service and processes it
 * @file:user.model.js
 * @author:Shrivya Shetty
 * @since:01-12-2021
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtHelper = require("../utility/auth");
const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  email: {
    type: String,

    // unique: true,
  },
  password: {
    type: String,

  }
}, { timestamps: true });
const User = mongoose.model('User', UserSchema);
/**
 * @description querry to create user
 * @param {*} userdetails 
 * @returns 
 */

const createUser = (userdetails) => {
  passwordhash = bcrypt.hashSync(userdetails.password, 10);
  const user = new User({
    firstname: userdetails.firstname,
    lastname: userdetails.lastname,
    age: userdetails.age,
    email: userdetails.email,
    password: passwordhash
  });
  return user.save()
};

/**
 * @description querry to forgot password
 */
forgotPassword = (email) => {
  return User
    .findOne({ email: email })
    .then((data) => {
      if (!data) {
        throw "Email not found";
      } else {
        let randomToken = jwtHelper.generateRandomCode();
        data.resetPasswordToken = randomToken;
        data.resetPasswordExpires = Date.now() + 3600000;
        return data
          .save()
          .then((res) => {
            console.log(res);
            return res;
          })
          .catch((err) => {
            throw err;
          });
      }
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * @description querry to reset user password
 */
reset = (token, newPassword) => {
  return User.findOne({ resetPasswordToken: token }).then((data) => {
    if (!data) {
      throw "token not found";
    } else {
      encryptedPassword = bcrypt.hashSync(newPassword, 10);
      (data.password = encryptedPassword),
        (data.resetPasswordToken = undefined);
      return data.save().then((data) => {

        return data;
      }).catch((err) => {
        console.log("err");
        throw err;
      });
    }
  }).catch((err) => {
    throw err;
  });
};

/**
 * @description querry to login user
 * @param {*} body 
 * @param {*} callback 
 * @returns 
 */
const loginUser = (body, callback) => {
  return User.findOne({ email: body.email }, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};

/**
 * @description querry to register a new user
 * @param {*} body 
 * @param {*} callback 
 * @returns 
 */
const registerUser = (body, callback) => {

  const user = new User({
    firstname: body.firstname,
    lastname: body.lastname,
    age: body.age,
    email: body.email,
    password: body.password
  });
  // Save userDetails in the database
  return user.save((err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};
/**
 * @description querry to find users
 * @returns 
 */
// const findAllUsers = () => {
//   return User.find()
// }
const findAllUsers = async () => {
  try {
    let data = await User.find();
    return data;
  } catch (error) {
    throw error;
  }
};
/**
 * @description querry to find user
 * @param {*} findId 
 * @returns 
 */
const findUser = (findId) => {
  return User.findById(findId)
}
/**
 * @description querry to find and update a user
 * @param {*} firstname 
 * @param {*} lastname 
 * @param {*} age 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
const updateUser = (findId,firstname, lastname, age, email, password) => {
  return User.findByIdAndUpdate(findId, {
    firstname: firstname, lastname: lastname, age: age, email: email, password: password
  }, { new: true }).then((result) => {
    console.log("updated");
    return result;
  }).catch((err) => {
    console.log("error in updation of user data");
    return err
  })
}
/**
 * @description querry to delete a  user using id
 * @param {*} findId 
 * @returns 
 */
const deleteById = (findId) => {
  return User.findByIdAndRemove(findId)
}
module.exports = {
  createUser,
  findAllUsers,
  findUser,
  updateUser,
  deleteById,
  loginUser,
  registerUser, forgotPassword, reset
}
