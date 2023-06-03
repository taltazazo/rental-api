import "reflect-metadata";
import { autoInjectable } from "tsyringe";
import UserService from "../services/user.service";
import BaseController from "./base.controller";
import { UserSchemaValidation } from "../models/user.model";

@autoInjectable()
export default class UserController extends BaseController {
  constructor(service?: UserService, schemaValidation?: UserSchemaValidation) {
    super(service, schemaValidation);
  }
}
