const Joi = require('joi')

const userSchemaVAlidation = Joi.object({
  name: Joi.string().min(4).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().min(4).required(),
  about: Joi.string().min(10).required()
})


module.exports = userSchemaVAlidation