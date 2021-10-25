var nodemailer = require('nodemailer');
const createEmail=(details)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shrifundonotes@gmail.com',
      pass: 'shrifund5$'
    }
  });
  
  var mailOptions = {
    from: 'shrifundonotes@gmail.com',
    to: details.email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
module.exports={
  createEmail
};