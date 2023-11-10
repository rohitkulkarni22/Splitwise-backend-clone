const Joi = require("@hapi/joi");

const signupValidation = (data) => {
    // Validating the signup registration data through a schema
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(6).required(),
    });

    return schema.validate(data);
};

const loginValidation = (data) => {
    // Validating the login user data through a schema
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(6).required(),
    });

    return schema.validate(data);
};


module.exports = { signupValidation, loginValidation };