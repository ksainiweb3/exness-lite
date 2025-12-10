import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookies = req.cookies;
  const token = cookies["session"];
  console.log(token);
  if (!token) {
    res.json({ message: "No authorization token" }).status(403);
    return;
  }
  const userId = jwt.verify(
    token,
    process.env.JWT_SECRET || "random"
  ) as string;

  req.id = userId;
  next();
}
