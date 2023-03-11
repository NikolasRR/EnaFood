import Joi from "joi";

import { UserBody } from "../../types/userTypes.js";

export const userSchema = Joi.object<UserBody>({
  name: Joi.string().max(40).required(),
  email: Joi.string().email().required()
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required()
})