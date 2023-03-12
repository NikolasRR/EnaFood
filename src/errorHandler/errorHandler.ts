import { NextFunction, Request, Response } from "express";

type error = {
  type: string,
  message: string
};

export default async function errorHandler(error: error, req: Request, res: Response, next: NextFunction) {
  let code: number;

  switch (error.type) {
    case "bad request":
      code = 400;
      break;
    case "not found":
      code = 404;
      break;
    case "conflict":
      code = 409;
      error.message = "email already registered"
      break;
    case "token":
      code = 422;
      error.message = "token missing, expired or unvalid";
      break;
    case "database":
      code = 500;
      error.message = "something went wrong when creating your account";
      break;
    default:
      code = 500;
      break;
  }
  res.status(code).send(error.message);
}