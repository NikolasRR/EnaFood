import { NextFunction, Request, Response } from "express";

import { AddOrUpdateSchema, DeleteSchema } from "./schemas/cartSchemas.js";


async function validateForAdditionAndUpdate(req: Request, res: Response, next: NextFunction) {
  const validation = AddOrUpdateSchema.validate(req.body, { abortEarly: false });

  if (validation.error) throw { 
    type: "schema", 
    message: validation.error.details.map(detail => detail.message)
  };

  next();
}

async function validateForDeletion(req: Request, res: Response, next: NextFunction) {
  const validation = DeleteSchema.validate(req.body, { abortEarly: false });

  if (validation.error) throw { 
    type: "schema", 
    message: validation.error.details.map(detail => detail.message)
  };

  next();
}

const middleware = {
  validateForAdditionAndUpdate,
  validateForDeletion
}

export default middleware;