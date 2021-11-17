const jwtHelper = require("../utility/auth");

  const validate = (req, res, next) => {
    //check if content is present
    if (!req.body.content) {
      return res.status(400).send({
        message: "Note content can not be empty",
      });
    }
    //validate title name
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

module.exports = {
  validate,
  ensureToken
}