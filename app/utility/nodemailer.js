// var nodemailer = require('nodemailer');
// // const createEmail=(details)=>{
// //   var transporter = nodemailer.createTransport({
// //     service: 'gmail',
// //     auth: {
// //       user: 'shrifundonotes@gmail.com',
// //       pass: 'shrifund5$'
// //     }
// //   });
  
//   // var mailOptions = {
//   //   from: 'shrifundonotes@gmail.com',
//   //   to: details.email,
//   //   subject: 'Sending Email using Node.js',
//   //   text: 'That was easy!'
//   // };
  
// //   transporter.sendMail(mailOptions, function(error, info){
// //     if (error) {
// //       console.log(error);
// //     } else {
// //       console.log('Email sent: ' + info.response);
// //     }
// //   });
// // }
// // module.exports={
// //   createEmail
// // };
// class nodeMailer {
//   mailer = (email, token) => {
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: 'shrifundonotes@gmail.com',
//        pass: 'shrifund5$'
//       },
//     });
//     var mailOptions = {
//       from: 'shrifundonotes@gmail.com',
//       to: email,
//       subject: 'Sending Email using Node.js',
//       html: `<a href='http://localhost:3000/user/reset/${token}'>click here</a>`,
//       text: 'That was easy!'
//     };
    
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//   }
//   };


// module.exports = new nodeMailer();

// es (28 sloc)  746 Bytes
   
var nodemailer = require("nodemailer");
class nodeMailer {
  mailer = (email, token) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'shrifundonotes@gmail.com',
        pass: 'shrifund5$'
      },
    });

    var mailOptions = {
      from: 'shrifundonotes@gmail.com',
      to: email,
      subject: "Sending Email using Node.js",
      // html: `<a>http://localhost:4000/users/reset/${token}</a>`,
      html: `<a href='http://localhost:3000/users/reset/${token}'>click here</a>`,
      text: "password reset",
    };

    return transporter
      .sendMail(mailOptions)
      .then((data) => {
        return "Email sent successfully!!";
      })
      .catch((err) => {
        return err;
      });
  };
}

module.exports = new nodeMailer();