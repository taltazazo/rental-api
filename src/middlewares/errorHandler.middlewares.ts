import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { container } from "tsyringe";
import { LoggerI } from "../interfaces/logs.interface";

export default (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const Logger: LoggerI = container.resolve("Logger");

  Logger.error(err.message);

  if (err instanceof CustomError) {
    return res.status(err.errorCode).send({ errors: err.serializeErrors() });
  }
  res.status(500).send({ errors: [{ message: "Something broke!" }] });
};
