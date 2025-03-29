let { body, validationResult } = require('express-validator')
let constants = require('./constants')
let util = require('util')

let options = {
    password:{
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    },
    username:{
        minLength: 6
    }
}

module.exports = {
    validate: function (req, res, next) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            CreateErrorResponse(res, 400, errors.array())
        } else {
            next();
        }
    },
    SignUpValidator: [
        body("username").isLength(options.username).withMessage(util.format(constants.VALIDATOR_ERROR_USERNAME,options.username.minLength)),
        body("password").isStrongPassword(options.password).withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
            options.password.minLength,
            options.password.minLowercase,
            options.password.minUppercase,
            options.password.minNumbers,
            options.password.minSymbols)),
        body("email").isEmail().withMessage(constants.VALIDATOR_ERROR_EMAIL)
    ],
    LoginValidator: [
        body("username").isLength(options.username).withMessage("username hoac password sai"),
        body("password").isStrongPassword(option.password).withMessage("username hoac password sai")
    ],
    ChangePasswordValidator: [
        body("oldpassword").notEmpty().withMessage("Old password is required"),
        body("newpassword").isStrongPassword(options.password).withMessage("New password does not meet security requirements")
    ],
    ForgotPasswordValidator: [
        body("email").isEmail().withMessage("Invalid email address")
    ],
    ResetPasswordValidator: [
        body("password").isStrongPassword(options.password).withMessage("New password does not meet security requirements")
    ],

    UserCreateValidator: [
        body("username").isLength(options.username)
            .withMessage(util.format(constants.VALIDATOR_ERROR_USERNAME, options.username.minLength)),
        body("password").isStrongPassword(options.password)
            .withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
                options.password.minLength,
                options.password.minLowercase,
                options.password.minUppercase,
                options.password.minNumbers,
                options.password.minSymbols)),
        body("email").isEmail().withMessage(constants.VALIDATOR_ERROR_EMAIL),
        body("role").isIn(["user", "admin", "moderator"]).withMessage("Invalid role") // Kiểm tra role hợp lệ
    ],

    UserUpdateValidator: [
        body("username").optional().isLength(options.username)
            .withMessage(util.format(constants.VALIDATOR_ERROR_USERNAME, options.username.minLength)),
        body("password").optional().isStrongPassword(options.password)
            .withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
                options.password.minLength,
                options.password.minLowercase,
                options.password.minUppercase,
                options.password.minNumbers,
                options.password.minSymbols)),
        body("email").optional().isEmail().withMessage(constants.VALIDATOR_ERROR_EMAIL),
        body("role").optional().isIn(["user", "admin", "moderator"]).withMessage("Invalid role") // Cho phép cập nhật role nhưng phải hợp lệ
    ]
}
// multer