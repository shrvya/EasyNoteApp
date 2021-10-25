const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  email: {
    type: String,
    required: true,
    unique: [true, "already exists"],
  },
  password: {
    type: String,
    //minlength:5
    //required=true,
  }
}, { timestamps: true });
const User = mongoose.model('User', UserSchema);
// Create a user 1st method

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

const forgotUser = (mail) => {
  return User.findOne({ email: mail });

}

const reset = (token, Password) => {
  return User
    .findOne({ resetPasswordToken: token })
    .then((data) => {
      if (!data) {
        throw "token not found";
      } else {
        encryptPassword = bcrypt.hashSync(Password, 10);
        (data.password = encryptPassword),
          (data.resetPasswordToken = undefined);
        return data.save()
          .then((data) => {
            return data;
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
const loginUser = (body, callback) => {
  return User.findOne({ email: body.email }, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};

//creates a user and saves it in database
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
const findAllUsers = () => {
  return User.find()
}

const findUser = (findId) => {
  return User.findById(findId)
}
// Find  and update user
const updateUser = (firstname, lastname, age, email, password) => {
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
// query to delete a note
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
  registerUser, User, forgotUser, reset
}
