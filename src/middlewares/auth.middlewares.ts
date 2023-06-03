import { NextFunction, Request, Response } from "express";

interface customRequest extends Request {
  user: {
    role: string;
  };
}

const getTokenPayload = (_token: string) => {
  // here we should decode the token and return the payload that contains the role
  return { role: "admin" };
};

export default (req: customRequest, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  // if (!token) {
  //   return res.status(401).send("Access denied. No token provided");
  // }

  try {
    const payload = getTokenPayload(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token!");
  }
};
