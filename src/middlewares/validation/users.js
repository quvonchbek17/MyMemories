import Joi from "joi"

export const registerUser = Joi.object().keys({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().min(12).required()
})

export const updateUser = Joi.object().keys({
    name: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    email: Joi.string().min(12)
})
