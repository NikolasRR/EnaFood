import { ProductOnCart } from "@prisma/client";
import Joi from "joi";

export const AddOrUpdateSchema = Joi.object<ProductOnCart>({
  productId: Joi.string().required(),
  amount: Joi.number().integer().required()
})

export const DeleteSchema = Joi.object({
  productId: Joi.string().required()
})