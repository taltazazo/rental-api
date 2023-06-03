import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe";
import UserSI from "../interfaces/user.interface";
import BaseService from "./base.service";
import { Model } from "mongoose";

@autoInjectable()
export default class UserService extends BaseService<UserSI> {
  constructor(@inject("UserModel") model?: Model<UserSI>) {
    super(model);
  }
}
