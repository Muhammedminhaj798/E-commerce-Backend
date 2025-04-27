import Joi from "joi";

export const joiUserSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  
  isAdmin: Joi.boolean(),

  isBlocked: Joi.boolean(),

  refreshToken: Joi.string().allow('', null),

  isDeleted: Joi.boolean()
});


export const joiUserLogin = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Enter a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

export const joiProductSchema = Joi.object({
  name : Joi.string().required(),
  type : Joi.string().required(),
  price : Joi.number().min(0).required(),
  description : Joi.string().required(),
  brand : Joi.string().required(),
  rating : Joi.number().min(0).max(5),
  qty:Joi.number().min(1).required(),
  review : Joi.string()
})