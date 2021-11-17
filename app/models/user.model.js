const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtHelper = require("../utility/auth");
const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  email: {
    type: String,
    
    unique: true,
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

// const reset = (token, Password) => {
//   return User
//     .findOne({ resetPasswordToken: token })
//     .then((data) => {
//       if (!data) {
//         throw "token not found";
//       } else {
//         encryptPassword = bcrypt.hashSync(Password, 10);
//         (data.password = encryptPassword),
//           (data.resetPasswordToken = undefined);
//         return data.save()
//           .then((data) => {
//             return data;
//           })
//           .catch((err) => {
//             throw err;
//           });
//       }
//     })
//     .catch((err) => {
//       throw err;
//     });
// };
// const reset= (token, password) => {
//   return User
//     .findOne({ resetPasswordToken: token })
//     .then((data) => {
//       if (!data) {
//         throw "token not found";
//       } else {
//         encryptedPassword = bcrypt.hashSync(password, 10);
//         (data.password = encryptedPassword),
//           (data.resetPasswordToken = undefined);
//         return data
//           .save()
//           .then((data) => {
//             return data;
//           })
//           .catch((err) => {
//             throw err;
//           });
//       }
//     })
//     .catch((err) => {
//       throw err;
//     });
// };
// const reset = (token, newPassword) => {
//   return User
//     .findOne({ resetPasswordToken: token })
//     .then((data) => {
//       if (!data) {
//         throw "token not found";
//       } else {
//         encryptedPassword = bcrypt.hashSync(newPassword, 10);
//         (data.password = encryptedPassword),
//           (data.resetPasswordToken = undefined);
//         return data
//           .save()
//           .then((data) => {
//             return data;
//           })
//           .catch((err) => {
//             console.log("errrrrrr");
//             throw err;
//           });
//       }
//     })
//     .catch((err) => {
//       throw err;
//     });
// };
reset = (token, newPassword) => {
  return User.findOne({resetPasswordToken: token}).then((data) => {
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
// reset = (token, newPassword) => {
//   return User
//     .findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     })
//     .then((data) => {
//       if (!data) {
//         throw "token not found";
//       } else {
//         encryptedPassword = bcrypt.hashSync(newPassword, 10);
//         (data.password = encryptedPassword),
//           (data.resetPasswordToken = undefined),
//           (data.resetPasswordExpires = undefined);
//         return data
//           .save()
//           .then((data) => {
//             return data;
//           })
//           .catch((err) => {
//             throw err;
//           });
//       }
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

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
  registerUser, forgotPassword, reset
}
