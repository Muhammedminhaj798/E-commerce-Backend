import Joi from "joi";

const joiUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().message({
    "string.password.base": "Password must be at least 6 characters long",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

const joiUserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
export { joiUserSchema, joiUserLogin };