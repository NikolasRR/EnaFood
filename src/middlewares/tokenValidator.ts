import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: any,
  iat: number,
  exp: number
}

function validateToken(req: Request, res: Response, next: NextFunction) {
  const providedToken = req.headers.authorization;
  const key = process.env.JWT_SECRET;
  jwt.verify(providedToken, key, (err, decoded: TokenPayload) => {
    if (err) throw { type: "token", message: err.message }

    res.locals.userId = decoded.id;
  });

  next();
}

export default validateToken;