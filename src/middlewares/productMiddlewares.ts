import { NextFunction, Request, Response } from "express";



async function validatePageNumber(req: Request, res: Response, next: NextFunction) {
  const page = parseInt(req.query.page as string);  
  if (page <= 0 || Number.isNaN(page)) throw { type: "bad request", message: "must inform page on query, page >= 1" };

  next();
}

const middlewares = {
  validatePageNumber
}

export default middlewares;