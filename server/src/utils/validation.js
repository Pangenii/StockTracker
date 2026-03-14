const joi = require("joi");
const validateRegisterInput = (data) => {
    const schema = joi.object({
        username: joi.string().min(6).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
    })

    return schema.validate(data)
}

const validateLoginInput = (data) => {
    const schema = joi.object({
        identifier: joi.string().required(),
        password: joi.string().min(6).required(),
    })
    return schema.validate(data)
}

module.exports = { validateRegisterInput, validateLoginInput };