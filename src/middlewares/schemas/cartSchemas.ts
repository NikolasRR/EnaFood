import { ProductOnCart } from "@prisma/client";
import Joi from "joi";

export const userSchema = Joi.object<ProductOnCart>({
  productId: Joi.string().required(),
  amount: Joi.number().integer().required()
})