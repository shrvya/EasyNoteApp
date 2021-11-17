const { check, validationResult } = require('express-validator');
const userValidationRules = () => {
    return [
        check('firstname').exists().matches("^[A-Z][a-zA-Z]{2,}").isLength({ min: 3 })
            .withMessage("Please enter valid firstname"),
        check('lastname').matches("^[A-Z][a-zA-Z]{2,}").isLength({ min: 2 })
            .withMessage("Please enter valid lasttname"),
        check('age').isNumeric().withMessage("enter valid age"),
        check('email').exists().isEmail().withMessage("enter valid Email"),
        check('password').matches("^[a-zA-Z0-9@#$%^&*()!~]{8,}$").withMessage("enter valid passswordd")
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    return res.status(422).json({ errors: extractedErrors })
}
module.exports = { userValidationRules, validate };