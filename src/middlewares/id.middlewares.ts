import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export default (_req: Request, res: Response, next: NextFunction, id: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }

  next();
};
