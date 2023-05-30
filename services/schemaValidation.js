const Joi = require("joi");

const schemaValidationContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Missing required 'name' field",
    "string.min": "The length of 'name' must be between 3 and 30 characters",
    "string.max": "The length of 'name' must be between 3 and 30 characters",
  }),

  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing required 'email' field" }),

  phone: Joi.string()
    .pattern(
      new RegExp(
        String.raw`^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$`
      )
    )
    .required()
    .messages({
      "any.required": "Missing required 'phone' field",
      "string.pattern.base":
        "The phone number format is incorrect. Please enter in the format +XX-XXX-XXX-XX-XX",
    }),
});

module.exports = schemaValidationContact;
