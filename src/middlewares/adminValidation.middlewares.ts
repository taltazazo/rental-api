import { NextFunction, Request, Response } from "express";

interface customRequest extends Request {
  user: {
    role: string;
  };
}

export default (req: customRequest, res: Response, next: NextFunction) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
