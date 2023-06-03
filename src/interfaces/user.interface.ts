import mongoose from "../database";

export interface UserI {
  name: string;
  email: string;
  role: string;
}

export default interface UserSI extends UserI, mongoose.Document {}
