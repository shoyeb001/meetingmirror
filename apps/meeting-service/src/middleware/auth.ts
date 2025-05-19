import { Request, Response, NextFunction } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.passport && req.session.passport.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}