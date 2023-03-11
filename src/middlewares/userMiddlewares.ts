import { NextFunction, Request, Response } from "express";

import { loginSchema, userSchema } from "./schemas/userSchemas.js";

async function validateCreationData(req: Request, res: Response, next: NextFunction) {
  const validation = userSchema.validate(req.body, { abortEarly: false });

  if (validation.error) throw { 
    type: "schema", 
    message: validation.error.details.map(detail => detail.message)
  };

  next();
}

async function validateLogInData(req: Request, res: Response, next: NextFunction) {
  const validation = loginSchema.validate(req.body, { abortEarly: false });

  if (validation.error) throw { 
    type: "schema", 
    message: validation.error.details.map(detail => detail.message)
  };

  next();
}

const middleware = {
  validateCreationData,
  validateLogInData
}

export default middleware;