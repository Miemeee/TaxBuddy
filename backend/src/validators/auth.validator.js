import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().required(),          
  email: Joi.string().email().required(),     // Valid email address
  password: Joi.string().min(6).required(),   // Password minimum 6 
});