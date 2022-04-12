import Joi from "joi-browser";

const registerSchema = {
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  biz: Joi.boolean().required(),
};

export default registerSchema;
