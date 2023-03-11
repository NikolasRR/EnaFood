import { ProductOnCart } from "@prisma/client";
import Joi from "joi";

export const AddOrUpdateSchema = Joi.object<ProductOnCart>({
  productId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
  amount: Joi.number().integer().required()
})

export const DeleteSchema = Joi.object({
  productId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
})