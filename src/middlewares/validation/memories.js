import Joi from "joi"

export const postMemory = Joi.object().keys({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    media: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string())
})

export const updateMemory = Joi.object().keys({
    id: Joi.string().required() ,
    title: Joi.string(),
    desc: Joi.string(),
    media: Joi.alternatives().try(Joi.array().items(Joi.string())),
    like: Joi.boolean(),
    dislike: Joi.boolean()
})
